from pydantic import BaseModel
from typing import Any, Optional

class PredictionResponse(BaseModel):
    model_name: str
    input_type: str
    prediction: Any
    confidence: Optional[float] = None

class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
