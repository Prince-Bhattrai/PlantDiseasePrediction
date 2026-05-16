from fastapi import FastAPI, File, UploadFile
from tensorflow.keras.models import load_model
from PIL import Image
import io
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

hosts = [
    "http://localhost:4000",
    "https://botani-scan.onrender.com"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=hosts,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = load_model("./models/plant_disease_prediction.h5")

# Class labels
class_names = ['Apple___Apple_scab',
                'Apple___Black_rot', 
                'Apple___Cedar_apple_rust',
                'Apple___healthy',
                'Blueberry___healthy',
                'Cherry_(including_sour)___healthy',
                'Cherry_(including_sour)___Powdery_mildew',
                'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
                'Corn_(maize)___Common_rust_',
                'Corn_(maize)___healthy',
                'Corn_(maize)___Northern_Leaf_Blight',
                'Grape___Black_rot',
                'Grape___Esca_(Black_Measles)',
                'Grape___healthy',
                'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
                'Orange___Haunglongbing_(Citrus_greening)',
                'Peach___Bacterial_spot',
                'Peach___healthy',
                'Pepper,_bell___Bacterial_spot',
                'Pepper,_bell___healthy',
                'Potato___Early_blight',
                'Potato___healthy',
                'Potato___Late_blight',
                'Raspberry___healthy',
                'Soybean___healthy',
                'Squash___Powdery_mildew',
                'Strawberry___healthy',
                'Strawberry___Leaf_scorch',
                'Tomato___Bacterial_spot',
                'Tomato___Early_blight',
                'Tomato___healthy',
                'Tomato___Late_blight',
                'Tomato___Leaf_Mold',
                'Tomato___Septoria_leaf_spot',
                'Tomato___Spider_mites Two-spotted_spider_mite',
                'Tomato___Target_Spot',
                'Tomato___Tomato_mosaic_virus',
                'Tomato___Tomato_Yellow_Leaf_Curl_Virus']



@app.get("/")
def home():
    return {
        "message": "Plant Disease Prediction API Running"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    try:
        #read uploaded file
        contents = await file.read()

        #open image
        img = Image.open(io.BytesIO(contents)).convert("RGB")

        #resize image to model input size
        img = img.resize((128, 128))

        #convert image to numpy array
        image_array = np.array(img)

        #convert to float32 and normalize
        image_array = image_array.astype("float32") / 255.0

        #add batch dimension
        image_array = np.expand_dims(image_array, axis=0)

        #debug shape
        print("Image Shape:", image_array.shape)

        #predict
        prediction = model.predict(image_array)

        #debug prediction
        print("Raw Prediction:", prediction)

        #get highest prediction index
        predicted_index = int(np.argmax(prediction[0]))

        #get class name
        prediction_class = class_names[predicted_index]
        plant, disease = get_plant_disease(predicted_index=predicted_index)

        #confidence score
        confidence = float(np.max(prediction[0])) * 100

        return {
            "disease":disease ,
            "plant":plant,
            "confidence": round(confidence, 2),
            "raw_prediction": prediction.tolist()
        }

    except Exception as e:
        return {
            "error": str(e)
        }


def get_plant_disease(predicted_index):
    full_class = class_names[predicted_index]

    plant, disease = full_class.split("___")

    plant = plant.replace("_", " ")
    disease = disease.replace("_", " ")
    

    return plant, disease