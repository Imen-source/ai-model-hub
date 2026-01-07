from fastapi import APIRouter

router = APIRouter(prefix="/models", tags=["Models"])

@router.get("/")
async def list_models():
    # Only one model for now
    return [{"name": "fashion_mnist_cnn", "description": "Fashion MNIST CNN classifier"}]
