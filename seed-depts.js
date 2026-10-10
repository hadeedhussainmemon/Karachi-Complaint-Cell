
import mongoose from 'mongoose';
import dbConnect from './src/lib/dbConnect.ts';
import { Department } from './src/models/Department.ts';

async function seed() {
  await dbConnect();
  const count = await Department.countDocuments();
  if (count === 0) {
    await Department.insertMany([
      { name: 'K-Electric', acronym: 'KE' },
      { name: 'Karachi Water & Sewerage Board', acronym: 'KWSB' },
      { name: 'Sindh Solid Waste Management Board', acronym: 'SSWMB' },
      { name: 'Sui Southern Gas Company', acronym: 'SSGC' },
      { name: 'Karachi Metropolitan Corporation', acronym: 'KMC' }
    ]);
    console.log('Seeded Karachi departments');
  }
  process.exit();
}
seed();
