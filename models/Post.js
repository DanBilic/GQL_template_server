import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, trim: true, required: [true, "Please add a title"] },
  description: {
    type: String,
    trim: true,
    required: [true, "Please add a description"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  blog: { type: mongoose.Schema.ObjectId, ref: "Blog", required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Post", PostSchema);
