import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
        user: {type: String, required: true},
        message: {type: String, required: true},
        date: {type: Date, default: Date.now},
        roomName: {type: String, required: true},
    },
    {

        collection: "messages"
    });

const Message = mongoose.model("Message", messageSchema);

export default Message;