import mongoose, { Schema, Document, Model } from "mongoose";


export interface IEvent extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  eventDate: Date;
  location: string;
  type: "public" | "private";
  allowedUsers: mongoose.Schema.Types.ObjectId[];
}

const EventSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["public", "private"],
      default: "public",
    },
    allowedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "PrivateRequest" }], 
  },
  { timestamps: true }
);

const EventModel: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default EventModel;
