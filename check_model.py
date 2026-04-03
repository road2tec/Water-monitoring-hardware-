from ultralytics import YOLO
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "ai_model", "best.pt")

try:
    model = YOLO(model_path)
    print(f"Model Classes: {model.names}")
except Exception as e:
    print(f"Error: {e}")
