import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPrivateRequest extends Document {
  event: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
}

const PrivateRequestSchema: Schema = new Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const PrivateRequestModel: Model<IPrivateRequest> =
  mongoose.models.PrivateRequest || mongoose.model<IPrivateRequest>("PrivateRequest", PrivateRequestSchema);

export default PrivateRequestModel;
