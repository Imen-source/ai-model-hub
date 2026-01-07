from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, models, predict_image

app = FastAPI(
    title="AI Model Hub",
    description="Full-stack AI inference platform",
    version="1.0.0"
)

# Allow React frontend
origins = ["http://localhost:5174", "http://127.0.0.1:5174"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Routers
app.include_router(health.router)
app.include_router(models.router)
app.include_router(predict_image.router)

@app.get("/")
def root():
    return {"message": "AI Model Hub backend is running"}
