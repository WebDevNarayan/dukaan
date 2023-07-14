import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
    },
    token: String,
    reset_token: String,
    reset_token_sent_at: Date,
    verified_at: Date,
    verification_sent_at: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.verification_sent_at = new Date();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
