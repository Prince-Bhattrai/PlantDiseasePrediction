# BotaniScan - Plant Disease Prediction System

BotaniScan is a full-stack AI-based web application designed to detect plant diseases from leaf images using a deep learning model. The system helps users quickly identify plant health issues and provides predictions with confidence scores.

---

## Project Overview

This project is built using a machine learning model trained on the PlantVillage dataset, which contains 35 different plant disease classes.

The application allows users to upload plant leaf images and receive:
- Disease prediction
- Confidence score
- Stored prediction history

BotaniScan combines machine learning, FastAPI, Node.js, React.js, and MongoDB into a complete full-stack system.

---

## Machine Learning Model

- Dataset: PlantVillage Dataset  
- Framework: Keras (TensorFlow backend)  
- Number of Classes: 35  
- Model Type: Convolutional Neural Network (CNN) for image classification  
- Output: Disease name with confidence score  

The trained model is served through a FastAPI backend for real-time predictions.

### Training Details

The model was trained for 5 epochs due to computational limitations. At this stage, the model achieved approximately 90% accuracy. With further training (50–100 epochs), the accuracy can potentially be improved to above 95%.

---

## Backend Architecture

### FastAPI (ML Service)
- Loads the trained Keras model  
- Receives image requests from Node.js backend  
- Returns prediction results  
- Runs using Uvicorn server  

### Node.js Backend
- Acts as an intermediary between frontend and FastAPI  
- Handles authentication and core business logic  
- Stores prediction history in MongoDB  
- Manages image uploads and processing  

Key features:
- JWT-based authentication  
- Password hashing using bcrypt  
- File uploads using Multer  
- Cloud image storage using Cloudinary  

---

## Frontend (React.js)

The frontend is built using React.js with a clean glass-style UI design.

Users can:
- Register and log in  
- Upload plant images  
- View prediction results  
- Access prediction history  

Libraries used:
- Axios for API requests  
- React Icons for UI icons  
- Custom CSS for glassmorphism design  

---

## Database

MongoDB is used to store:
- User information  
- Uploaded image URLs  
- Prediction results  
- Confidence scores  
- Disease labels  

---

## Image Storage

Cloudinary is used for storing uploaded images, ensuring fast and scalable image management.

---

## Authentication

The system uses JWT-based authentication for secure user login and signup. Passwords are hashed using bcrypt before being stored in the database.

---

## Tech Stack

Frontend:
- React.js  
- Axios  
- React Icons  
- CSS (Glass UI Design)  

Backend:
- Node.js  
- Express.js  
- FastAPI  
- Uvicorn  

Machine Learning:
- TensorFlow / Keras  
- NumPy  
- Pandas  

Database and Storage:
- MongoDB  
- Cloudinary  

---

## Features

- Plant disease detection using deep learning  
- Confidence score for predictions  
- User authentication system  
- Prediction history tracking  
- Image upload and cloud storage  
- Fast API-based inference system  
- Modern UI design  

---

## How the System Works

1. User uploads a plant leaf image from the frontend  
2. Node.js backend receives and processes the request  
3. Image is forwarded to FastAPI service  
4. The trained Keras model predicts the disease  
5. Result is stored in MongoDB and Cloudinary  
6. Response is sent back to the frontend  

---

## Future Improvements

- Support for multiple languages  
- Improved model accuracy with larger datasets  
- Real-time camera-based prediction  
- Docker-based deployment and CI/CD pipeline  

---

## Developer

Built by Prince Bhattrai

---

## License

This project is intended for educational and research purposes.