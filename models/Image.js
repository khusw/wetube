import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: String,
  image: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const model = mongoose.model("Image", imageSchema);

export default model;
