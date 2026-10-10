import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteContent extends Document {
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  exploreBtnText: string;
  submitBtnText: string;
  footerAbout: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
}

const SiteContentSchema: Schema = new Schema({
  heroTitle1: { type: String, default: 'Connecting Citizens' },
  heroTitle2: { type: String, default: 'with Better Public Services' },
  heroDesc: { type: String, default: 'Report daily civic issues like water, power, sewerage, and road damage.' },
  exploreBtnText: { type: String, default: 'Explore Locations' },
  submitBtnText: { type: String, default: 'Submit Complaint' },
  footerAbout: { type: String, default: 'Bridging the gap between the Karachi Metropolitan Corporation and its citizens.' },
  contactAddress: { type: String, default: 'KMC Head Office, M.A. Jinnah Road, Karachi, Pakistan' },
  contactPhone: { type: String, default: '1339' },
  contactEmail: { type: String, default: 'support@kmc.gos.pk' },
}, { timestamps: true });

export const SiteContent = mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);
