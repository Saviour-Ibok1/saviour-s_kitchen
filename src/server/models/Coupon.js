import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    type: {
      type: String,
      enum: [
        "percentage",
        "fixed",
        "free_delivery",
      ],
      required: true,
    },

    value: {
      type: Number,
      default: 0,
      min: 0,
    },

    minimumOrder: {
      type: Number,
      default: 0,
      min: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },

    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model(
  "Coupon",
  couponSchema
);

export default Coupon;