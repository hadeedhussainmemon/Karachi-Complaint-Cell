import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  acronym: { type: String, required: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);
