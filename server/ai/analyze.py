import os
import sys
import json
import cv2
import numpy as np
import torch
from ultralytics import YOLO

def enhance_underwater(image):
    """Simple but effective CLAHE enhancement for underwater images"""
    # Convert to LAB color space
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    
    # Apply CLAHE to L channel
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    cl = clahe.apply(l)
    
    # Merge and convert back to BGR
    limg = cv2.merge((cl, a, b))
    enhanced = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
    return enhanced

def get_depth_map(image):
    """Generate depth map using MiDaS model"""
    # Load MiDaS model (Small version for speed)
    model_type = "MiDaS_small"
    midas = torch.hub.load("intel-isl/MiDaS", model_type)
    
    # Use GPU if available
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    midas.to(device)
    midas.eval()
    
    # Prepare transforms
    midas_transforms = torch.hub.load("intel-isl/MiDaS", "transforms")
    transform = midas_transforms.small_transform if model_type == "MiDaS_small" else midas_transforms.dpt_transform
    
    # Input transformation
    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    input_batch = transform(img_rgb).to(device)
    
    # Predict depth
    with torch.no_grad():
        prediction = midas(input_batch)
        prediction = torch.nn.functional.interpolate(
            prediction.unsqueeze(1),
            size=image.shape[:2],
            mode="bicubic",
            align_corners=False,
        ).squeeze()
    
    output = prediction.cpu().numpy()
    
    # Normalize for visualization
    output_norm = cv2.normalize(output, None, 0, 255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8U)
    # Apply color map for 'vibe'
    depth_color = cv2.applyColorMap(output_norm, cv2.COLORMAP_MAGMA)
    return depth_color

def analyze_underwater(image_path, output_dir):
    try:
        # 1. Load Image
        image = cv2.imread(image_path)
        if image is None: return {"error": "Could not read image"}
        
        # 2. Image Enhancement
        enhanced = enhance_underwater(image)
        enhanced_name = f"enhanced_{os.path.basename(image_path)}"
        enhanced_path = os.path.join(output_dir, enhanced_name)
        cv2.imwrite(enhanced_path, enhanced)
        
        # 3. Depth Mapping
        depth = get_depth_map(enhanced)
        depth_name = f"depth_{os.path.basename(image_path)}"
        depth_path = os.path.join(output_dir, depth_name)
        cv2.imwrite(depth_path, depth)
        
        # 4. Object Detection (YOLO) - DUAL SCAN STRATEGY
        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_dir, "..", "..", "ai_model", "best.pt")
        model = YOLO(model_path)
        
        # Scan 1: Enhanced Image
        results_enhanced = model.predict(source=enhanced, conf=0.05, save=False, verbose=False)
        # Scan 2: Original Image (Backup)
        results_original = model.predict(source=image, conf=0.05, save=False, verbose=False)
        
        detections = []
        seen_boxes = [] # Simple NMS-like overlap check could go here, but merged list is fine for demo
        
        def process_results(results_list):
            for result in results_list:
                if result.boxes:
                    for box in result.boxes:
                        cls_id = int(box.cls[0])
                        conf = float(box.conf[0])
                        detections.append({
                            "id": cls_id,
                            "label": model.names[cls_id],
                            "confidence": conf,
                            "box": box.xywhn[0].cpu().numpy().tolist()
                        })

        process_results(results_enhanced)
        if len(detections) == 0:
            process_results(results_original)
        
        return {
            "enhancedUrl": enhanced_name,
            "depthUrl": depth_name,
            "detections": detections
        }

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing arguments"}))
        sys.exit(1)
    
    img_path = sys.argv[1]
    out_dir = sys.argv[2]
    
    # Silence torch hub downloads if already exists
    # results = analyze_underwater(img_path, out_dir)
    # print(json.dumps(results))
    
    # Wait, I need to make sure torch hub doesn't print too much to stdout
    import contextlib
    import io
    
    f = io.StringIO()
    with contextlib.redirect_stdout(f):
        results = analyze_underwater(img_path, out_dir)
    
    # Print the clean JSON only
    print(json.dumps(results))
