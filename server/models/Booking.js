import mongoose from "mongoose";

// Booking = confirmed job request (separate from inquiry)
const BookingSchema = new mongoose.Schema(
  {
    // If customer is logged in, we attach userId. If not, it stays null.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    moveType: { type: String, default: "" }, // e.g. home | furniture
    name: { type: String, required: true, trim: true }, // customer name
    phone: { type: String, required: true, trim: true }, // customer phone
    email: { type: String, default: "", trim: true }, // optional email
    pickup: { type: String, required: true, trim: true }, // pickup address
    delivery: { type: String, required: true, trim: true }, // delivery address
    moveDate: { type: String, default: "" }, // store as string
    notes: { type: String, default: "", trim: true }, // optional notes

    status: {
      type: String,
      enum: ["NEW", "CONFIRMED", "COMPLETED", "CANCELLED"], // admin updates this
      default: "NEW",
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

export default mongoose.model("Booking", BookingSchema);
