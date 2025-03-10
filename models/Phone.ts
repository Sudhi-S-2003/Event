import mongoose, { Schema, Document, Model } from "mongoose";

interface IPhoneNumber {
  slNo: number;
  code: string;
  value: string;
}

export interface IPhone extends Document {
  user: mongoose.Schema.Types.ObjectId;
  phone: IPhoneNumber[];
}

const PhoneSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phone: [
      {
        slNo: { type: Number, required: true }, 
        code: { type: String, required: true }, 
        value: { type: String, required: true }, 
      },
    ],
  },
  { timestamps: true }
);

PhoneSchema.index({ user: 1, "phone.slNo": 1 }, { unique: true });

const PhoneModel: Model<IPhone> =
  mongoose.models.Phone || mongoose.model<IPhone>("Phone", PhoneSchema);

export default PhoneModel;
