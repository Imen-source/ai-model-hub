from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.schemas.response import PredictionResponse

router = APIRouter(
    prefix="/predict/text",
    tags=["Prediction"]
)

class TextInput(BaseModel):
    text: str
    model_name: str = "sentiment_classifier"

@router.post("/", response_model=PredictionResponse)
def predict_text(data: TextInput):
    if len(data.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    return PredictionResponse(
        model_name=data.model_name,
        input_type="text",
        prediction="positive",
        confidence=0.87
    )
