import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    moveType: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: "" },
    pickup: { type: String, required: true, trim: true },
    delivery: { type: String, required: true, trim: true },
    moveDate: { type: String, default: "" },
    notes: { type: String, default: "" },

    status: {
      type: String,
      enum: ["NEW", "QUOTED", "BOOKED", "CLOSED"],
      default: "NEW",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);
