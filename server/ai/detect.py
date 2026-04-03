import os
import sys
import json
from ultralytics import YOLO

def detect_objects(image_path):
    try:
        # PATH RESOLUTION
        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.normpath(os.path.join(current_dir, "..", "..", "ai_model", "best.pt"))
        
        if not os.path.isfile(model_path):
            print(f"ERROR: Model weights not found at {model_path}", file=sys.stderr)
            return []

        # Load model
        model = YOLO(model_path)
        
        # Log model names for final verification
        print(f"DEBUG: Model Names from weights: {model.names}", file=sys.stderr)

        # Run inference at 5% confidence to see all potential detections
        results = model.predict(source=image_path, conf=0.05, imgsz=640, save=False, verbose=False)
        
        detections = []
        for result in results:
            if result.boxes:
                for box in result.boxes:
                    cls_id = int(box.cls[0])
                    confidence = float(box.conf[0])
                    
                    # RE-MAPPING LOGIC (FOR TESTING LABEL SWAP)
                    # Based on observation, the model thinks bottles are ID 2 (Fish)
                    if cls_id == 2:
                        label = "Plastic Bottle"
                    elif cls_id == 0:
                        label = "Waste/Trash"
                    elif cls_id == 1:
                        label = "Miscellaneous Waste"
                    else:
                        label = model.names[cls_id]

                    # Filter out very low confidence
                    if confidence < 0.10:
                        continue

                    # Get normalized coordinates
                    coords = box.xywhn[0].cpu().numpy().tolist() if box.xywhn is not None else [0.5, 0.5, 0.1, 0.1]

                    detections.append({
                        "id": cls_id,
                        "label": label,
                        "confidence": confidence,
                        "box": coords
                    })
        
        return detections
        
    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}", file=sys.stderr)
        return []

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("[]")
        sys.exit(0)
    
    img_path = sys.argv[1]
    final_results = detect_objects(img_path)
    print(json.dumps(final_results))
