
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ title: String, content: String, category: String, date: Date, url: String, slug: String }, { timestamps: true });
export const News = mongoose.models.News || mongoose.model('News', schema);
