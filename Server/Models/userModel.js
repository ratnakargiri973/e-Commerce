import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: Number,
        required: true,
        unique: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["buyer", "seller", "admin"],
        default: "buyer",
      },
      wishlist: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      ],
      isEmailVerified: {
        type: Boolean,
        default: false,
      },
},
{timestamps: true});

const userModel = mongoose.model("user", userSchema);
export default userModel;