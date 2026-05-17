import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error, please try again later",
        });
    }
};


export const logIn = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error, please try again later",
        });
    }
};


export const getCurrUser = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required"
            })
        }

        const user = await User.findById(id)
        return res.status(200).json({
            success: true,
            message: "Curr user",
            user
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error, please try again later",
        });
    }
}

export const userSetting = async (req, res) => {
    const { id } = req.user;
    const { name, email, address } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }
        if (email && email !== user.email) {

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists!"
                });
            }
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (address) user.address = address;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error please try again later!"
        });
    }
};