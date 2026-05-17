# BotaniScan - AI Powered Plant Disease Detection Platform

BotaniScan is a full-stack AI-based web application designed to detect plant diseases from plant leaf images using a deep learning model. The system helps users quickly identify plant health issues and provides predictions with confidence scores.

---

# Live Demo

Frontend: Your Vercel URL  
Backend API: Your Render URL  
ML API: Your FastAPI Render URL  

---

# Project Overview

This project combines Deep Learning, Full-Stack Web Development, Cloud Storage, and REST API architecture into a complete production-style application.

The application allows users to:

- Upload plant leaf images
- Detect plant diseases using AI
- View confidence scores
- Store prediction history
- Authenticate securely using JWT and Google OAuth

The deep learning model is trained using the PlantVillage dataset containing 35 disease classes.

---

# Features

- Plant disease detection using CNN
- Confidence score prediction
- JWT Authentication
- Google OAuth Login
- Prediction history tracking
- Cloud image upload using Cloudinary
- Separate ML inference service using FastAPI
- Responsive modern UI
- MongoDB database integration
- REST API architecture

---

# Tech Stack

## Frontend

- React.js
- Axios
- React Icons
- CSS

## Backend

- Node.js
- Express.js
- JWT
- bcrypt
- Multer

## Machine Learning

- TensorFlow
- Keras
- NumPy
- Pandas
- FastAPI
- Uvicorn

## Database & Storage

- MongoDB
- Cloudinary

---

# System Architecture

```txt
React Frontend
      ↓
Node.js / Express Backend
      ↓
FastAPI ML Service
      ↓
TensorFlow CNN Model
      ↓
MongoDB + Cloudinary
```

---

# Machine Learning Model

## Dataset

PlantVillage Dataset

## Model Details

- Model Type: Convolutional Neural Network (CNN)
- Framework: TensorFlow / Keras
- Number of Classes: 35
- Output: Disease prediction with confidence score

## Training Details

The model was trained for 5 epochs due to computational limitations and achieved approximately 90% accuracy.

Future improvements include:

- Longer training schedules
- Data augmentation
- Transfer learning
- Hyperparameter optimization
- Larger datasets for better generalization

---

# Authentication

The application uses:

- JWT-based authentication
- Password hashing with bcrypt
- Google OAuth login system

---

# Database

MongoDB stores:

- User information
- Prediction history
- Disease labels
- Confidence scores
- Uploaded image URLs

---

# Image Storage

Cloudinary is used for cloud-based image storage and management.

Benefits:

- Fast image delivery
- Scalable storage
- Secure image hosting
- CDN integration

---

# Folder Structure

```txt
BotaniScan/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── server.js
│
├── ml-api/
│   ├── model/
│   ├── app.py
│   └── requirements.txt
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/BotaniScan.git

cd BotaniScan
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend

npm install

npm start
```

Backend runs on:

```txt
http://localhost:5000
```

---

# FastAPI ML Service Setup

## Install Dependencies

```bash
cd ml-api

pip install -r requirements.txt
```

## Start FastAPI Server

```bash
uvicorn app:app --reload
```

ML API runs on:

```txt
http://127.0.0.1:8000
```

---


# API Workflow

1. User uploads plant image from frontend
2. Express backend receives image
3. Image uploads to Cloudinary
4. Backend forwards image to FastAPI service
5. CNN model predicts disease
6. Prediction result stored in MongoDB
7. Response returned to frontend

---

# Deployment

## Frontend

Deployed on Vercel

## Backend

Deployed on Render

## ML API

Deployed separately on Render using FastAPI

---

# Future Improvements

- Real-time camera prediction
- Docker containerization
- CI/CD pipeline integration
- Multi-language support
- Advanced analytics dashboard
- Improved model accuracy
- Mobile application support

---

# Challenges Faced

- Connecting Node.js backend with FastAPI service
- Handling image uploads efficiently
- Maintaining consistent image preprocessing
- Deploying ML inference service on cloud platforms
- Managing authentication securely

---

# Developer

Built by Prince Bhattrai

---

# License

This project is intended for educational and research purposes.
