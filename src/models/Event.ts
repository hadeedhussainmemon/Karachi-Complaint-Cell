
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ title: String, location: String, date: Date, description: String, image: String, slug: String }, { timestamps: true });
export const Event = mongoose.models.Event || mongoose.model('Event', schema);
