import mongoose from "mongoose";
import ErrorResponse from "./../util/errorResponse.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
      maxlength: [100, "name should not exceed 40 characters"],
    },
    email: {
      type: String,
      required: [true, "please enter email address"],
      match: [
        /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        "Please enter a valid email address",
      ],
      unique: true,
    },
    dob: String,
    documents: Array,
    profile_image: String,
  },
  { timestamps: true }
);

// for checking emal exit or not
userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new ErrorResponse("Email already exists", 400));
  } else {
    next();
  }
});

export default mongoose.model("User", userSchema);
