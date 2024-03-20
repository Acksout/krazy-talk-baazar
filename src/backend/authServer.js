import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Userdata from "../models/usersDatabaseModel.js";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
const PORT = 8080;

// Allow CORS middleware function
const allowCors = (fn) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
};

// Your route handler
const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
};

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (err) {
        console.error(err);
    }
};

connectDB().catch(console.error);

app.post("/apiauth/checkusername", async (req, res) => {
    const { username } = req.body;

    try {
        const user = await Userdata.findOne({ user: username });
        if (user) {
            res.send({ exists: true });
        } else {
            res.send({ exists: false });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }

});

// Apply the allowCors middleware to your routes
app.use(allowCors(handler)); // applying allowCors to the handler

app.listen(PORT, () => {
    console.log(`Auth Server is running on port ${PORT}`);
});
