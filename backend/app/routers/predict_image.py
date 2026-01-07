# backend/app/routers/predict_image.py

from fastapi import APIRouter, UploadFile, File, Query, HTTPException
from pathlib import Path
from PIL import Image
import torch
from torchvision import transforms

# Import your model class
from app.models.fashion_mnist_cnn import FashionMNISTCNN

router = APIRouter(prefix="/predict", tags=["Prediction"])

# Set base directory for model files
BASE_DIR = Path(__file__).resolve().parent.parent  # points to backend/app
MODELS_DIR = BASE_DIR / "models"

# Preprocessing transforms
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=1),
    transforms.Resize((28, 28)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# Class names for Fashion MNIST
CLASS_NAMES = [
    "T-shirt/top",
    "Trouser",
    "Pullover",
    "Dress",
    "Coat",
    "Sandal",
    "Shirt",
    "Sneaker",
    "Bag",
    "Ankle boot",
]

@router.post("/image")
async def predict_image(
    file: UploadFile = File(...),
    model_name: str = Query(...)
):
    try:
        # Build model path
        model_path = MODELS_DIR / f"{model_name}.pt"
        if not model_path.exists():
            raise HTTPException(status_code=404, detail=f"Model '{model_name}' not found")

        # Load model
        model = FashionMNISTCNN()
        state_dict = torch.load(model_path, map_location="cpu")
        model.load_state_dict(state_dict)
        model.eval()

        # Load and preprocess image
        image = Image.open(file.file).convert("L")
        image = transform(image)
        image = image.unsqueeze(0)  # add batch dimension: (1, 1, 28, 28)

        # Predict
        with torch.no_grad():
            outputs = model(image)
            probs = torch.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probs, 1)

        return {
            "model_name": model_name,
            "input_type": "image",
            "prediction": CLASS_NAMES[predicted.item()],
            "confidence": round(confidence.item(), 4),
        }

    except Exception as e:
        # Log the error for debugging
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail="Prediction failed")
