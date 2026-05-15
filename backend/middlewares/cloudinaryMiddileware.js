import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import {CloudinaryStorage} from "multer-storage-cloudinary"

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder_name:"plantDiseasePrediction",
    }
})

const upload = multer({storage:storage})


export default upload;