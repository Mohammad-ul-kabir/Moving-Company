import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true, uppercase: true },
    postcode: { type: String, required: true, trim: true, uppercase: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Area", areaSchema);
