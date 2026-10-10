
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: String, isActive: { type: Boolean, default: true } }, { timestamps: true });
export const Category = mongoose.models.Category || mongoose.model('Category', schema);
