import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Userdata from "../models/usersDatabaseModel.js";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
const PORT = 8080;

// Enable CORS
const allowedOrigins = ['http://localhost:8080'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

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

app.post("/api/checkusername", async (req, res) => {
    const {username} = req.body;

    try {
        const user = await Userdata.findOne({user: username});
        if (user) {
            res.send({exists: true});
        } else {
            res.send({exists: false});
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }

});

// Your other routes...

app.listen(PORT, () => {
    console.log(`Auth Server is running on port ${PORT}`);
});
