# AI Model Hub

![AI Model Hub](frontend/public/vite.svg)

**AI Model Hub** is a full-stack web application for **image classification** using deep learning. Users can upload images, choose a model, and get real-time predictions with confidence scores. The project demonstrates expertise in **Python (FastAPI, PyTorch), TypeScript, React, and full-stack development**.

---

## Features

- **Dynamic Model Loading:** Load multiple pre-trained PyTorch models dynamically.
- **Image Classification:** Predict classes for Fashion MNIST images with confidence scores.
- **Frontend/Backend Integration:** Seamless communication between React frontend and FastAPI backend.
- **Responsive UI:** Built with TailwindCSS and Framer Motion for smooth animations.
- **File Upload Handling:** Supports image uploads and validates inputs.
- **Error Handling & Loading States:** Provides clear feedback during inference and model loading.

---

## Tech Stack

### Backend
- Python 3.13
- [FastAPI](https://fastapi.tiangolo.com/) for REST APIs
- [PyTorch](https://pytorch.org/) for deep learning models
- Pillow & torchvision for image preprocessing

### Frontend
- React + TypeScript
- Vite for fast bundling
- TailwindCSS for styling
- Framer Motion for animations

---

## Folder Structure

ai-model-hub/
│
├─ backend/ # FastAPI backend
│ ├─ app/
│ │ ├─ routers/ # API endpoints
│ │ ├─ models/ # PyTorch models
│ │ └─ core/ # config & model loader
│ └─ requirements.txt
│
├─ frontend/ # React + TypeScript frontend
│ ├─ src/
│ │ ├─ pages/ # Predict page
│ │ ├─ components/ # UI components
│ │ └─ services/ # API calls
│
├─ scripts/ # Data scripts & sample images
└─ README.md

yaml
Copy code

---

## How to Run

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\Activate.ps1  # (Windows)
pip install -r requirements.txt
uvicorn app.main:app --reload
Frontend
bash
Copy code
cd frontend
npm install
npm run dev
Visit http://localhost:5173 to access the frontend.

Sample Models
fashion_mnist_cnn – CNN trained on Fashion MNIST dataset.

Easily extendable: add more PyTorch models to backend/app/models/ and they will appear in the frontend.

Highlights of Technical Skills
Full-Stack Development: Connected React frontend with FastAPI backend.

Deep Learning Integration: Built a robust pipeline to handle PyTorch models dynamically.

Type Safety & API Communication: Used TypeScript interfaces and proper error handling.

UI/UX Skills: Interactive file uploads, model selector, and live predictions.

Problem Solving: Overcame challenges in model loading and prediction handling.

Future Improvements
Add multiple datasets and models for extended predictions.

Add user authentication for personalized model access.

Deploy as a cloud-based SaaS application.