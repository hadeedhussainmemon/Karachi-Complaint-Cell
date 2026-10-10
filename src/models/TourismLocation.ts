
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: String, district: String, description: String, type: String, image: String, slug: String }, { timestamps: true });
export const TourismLocation = mongoose.models.TourismLocation || mongoose.model('TourismLocation', schema);
