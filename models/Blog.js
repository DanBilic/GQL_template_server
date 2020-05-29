import mongoose from "mongoose";
const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxLength: [40, "name can not be any longer than 40 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxLenght: [1000, "Description can not be more than 1000 characters"],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email",
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Cascade delete when blog gets removed
BlogSchema.pre("remove", async function (next) {
  console.log(`Posts being removed from Blog ${this._id}`.magenta);
  await this.model("Post").deleteMany({ blog: this._id });
  next();
});

//Reverse populate with virtuals
BlogSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "blog",
  justOne: false,
});

export default mongoose.model("Blog", BlogSchema);
