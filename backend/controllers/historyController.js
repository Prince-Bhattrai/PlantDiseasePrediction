import axios from "axios";
import FormData from "form-data";
import { History } from "../models/history.model.js";
import cloudinary from "../config/cloudinaryConfig.js";

export const predict = async (req, res) => {
    try {

        const image = req.file;
        const { id } = req.user;

        if (!image || !id) {
            return res.status(400).json({
                success: false,
                message: "Image not found!"
            });
        }

        const formData = new FormData();

        formData.append("file", image.buffer, {
            filename: image.originalname,
            contentType: image.mimetype,
        });

        const response = await axios.post(
            `${process.env.MODEL_URL}/predict`,
            formData,
            {
                headers: formData.getHeaders(),
            }
        );

        console.log(response.data);

        const base64Image =
            `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

        const uplodedImage = await cloudinary.uploader.upload(
            base64Image,
            {
                folder: "plantDiseasePrediction"
            }
        );

        const imageArr = {
            url: uplodedImage.secure_url,
            public_id: uplodedImage.public_id
        };

        const newHistory = new History({
            confidence: response.data.confidence,
            image: imageArr,
            disease:response.data.disease,
            plant:response.data.plant,
            user: id
        });

        await newHistory.save();

        return res.status(201).json({
            success: true,
            message: "Prediction successful",
            prediction:newHistory
            
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error please try again later."
        });
    }
};


export const getHistory = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required"
            })
        }

        const history = await History.find({ user: id }).populate("user")
        res.status(200).json({
            success: true,
            message: "User history",
            history
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "server error please try again later."
        })

    }
}



export const deleteHistory = async (req, res) => {
    try {

        const { id } = req.user;
        const historyId = req.params.id;

        const history = await History.findById(historyId);

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "History not found"
            });
        }

        if (history.user.toString() !== id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await cloudinary.uploader.destroy(history.image.public_id);

        const deletedHistory = await History.findByIdAndDelete(historyId);

        if (!deletedHistory) {
            return res.status(404).json({
                success: false,
                message: "History already deleted"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully deleted"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error please try again later!"
        });
    }
};