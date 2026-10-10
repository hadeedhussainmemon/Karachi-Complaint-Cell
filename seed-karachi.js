const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const newsSchema = new mongoose.Schema({ title: String, content: String, category: String, date: Date, url: String }, { timestamps: true });
const eventSchema = new mongoose.Schema({ title: String, location: String, date: Date, description: String, image: String }, { timestamps: true });
const locSchema = new mongoose.Schema({ name: String, district: String, description: String, type: String, image: String }, { timestamps: true });

const News = mongoose.models.News || mongoose.model('News', newsSchema);
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
const TourismLocation = mongoose.models.TourismLocation || mongoose.model('TourismLocation', locSchema);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  await News.deleteMany({});
  await Event.deleteMany({});
  await TourismLocation.deleteMany({});

  await News.insertMany([
    { title: "Sindh Government Approves Malir Expressway Extension", category: "Infrastructure", content: "The government has approved the final phase to ease traffic in Karachi.", date: new Date() },
    { title: "K-Electric Announces Solar Power Integration", category: "Energy", content: "KE is partnering with global firms for South Karachi.", date: new Date() }
  ]);

  await Event.insertMany([
    { title: "Karachi Eat Food Festival", location: "Beach View Park, Clifton", date: new Date("2026-10-18"), description: "The biggest food festival in Pakistan featuring local and international cuisines." },
    { title: "Sindh Cultural Day Celebration", location: "Frere Hall", date: new Date("2026-12-06"), description: "Celebrating the rich Sindhi heritage with music and art." }
  ]);

  await TourismLocation.insertMany([
    { name: "Clifton Beach (Sea View)", district: "South District", type: "Coastal Area", description: "The most famous public beach in Karachi offering camel rides and street food." },
    { name: "Frere Hall", district: "Central District", type: "Historical Landmark", description: "A beautifully preserved British colonial building dating back to 1865." }
  ]);

  console.log("Successfully seeded fully dynamic Karachi data into the Database!");
  process.exit();
}
seed();
