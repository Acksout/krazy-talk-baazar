import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Message from "../models/messageModel.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5020;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI + "/krazyChat");
        console.log('Database connected successfully');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();


app.use(express.json());

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

app.get("/api/test", async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        res.status(200).json({message: "Database connection is working"});
    } catch (error) {
        res.status(500).json({error: "Database connection error", message: error.message});
    }
});

app.post("/api/messages", async (req, res) => {
    const {user, message, roomName} = req.body;
    try {
        const newMessage = new Message({user, message, roomName});
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({error: "Error saving message", message: error.message});
    }
});

app.get("/api/messages/:roomName", async (req, res) => {
    const {roomName} = req.params;
    try {
        const messages = await Message.find({roomName});
        res.json(messages);
    } catch (error) {
        res.status(500).json({error: "Error retrieving messages", message: error.message});
    }
});


app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
