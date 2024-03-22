import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});

const Userdata = mongoose.model("userData", userDataSchema);

export default Userdata;