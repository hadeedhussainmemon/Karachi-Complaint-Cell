
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: String, towns: [String], isActive: { type: Boolean, default: true } }, { timestamps: true });
export const District = mongoose.models.District || mongoose.model('District', schema);
