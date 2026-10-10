const fs = require('fs');
const path = require('path');

const modelsDir = 'src/models';
if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });

// 1. Category Model
fs.writeFileSync(path.join(modelsDir, 'Category.ts'), `
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: String, isActive: { type: Boolean, default: true } }, { timestamps: true });
export const Category = mongoose.models.Category || mongoose.model('Category', schema);
`);

// 2. District Model
fs.writeFileSync(path.join(modelsDir, 'District.ts'), `
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: String, towns: [String], isActive: { type: Boolean, default: true } }, { timestamps: true });
export const District = mongoose.models.District || mongoose.model('District', schema);
`);

// 3. News Model
fs.writeFileSync(path.join(modelsDir, 'News.ts'), `
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ title: String, content: String, category: String, date: Date, url: String, slug: String }, { timestamps: true });
export const News = mongoose.models.News || mongoose.model('News', schema);
`);

// 4. Event Model
fs.writeFileSync(path.join(modelsDir, 'Event.ts'), `
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ title: String, location: String, date: Date, description: String, image: String, slug: String }, { timestamps: true });
export const Event = mongoose.models.Event || mongoose.model('Event', schema);
`);

// 5. TourismLocation Model
fs.writeFileSync(path.join(modelsDir, 'TourismLocation.ts'), `
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: String, district: String, description: String, type: String, image: String, slug: String }, { timestamps: true });
export const TourismLocation = mongoose.models.TourismLocation || mongoose.model('TourismLocation', schema);
`);

console.log('All backend models explicitly recreated.');
