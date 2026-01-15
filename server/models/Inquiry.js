import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    // If customer is logged in, we attach userId. If not, it stays null.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

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
