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
  aboutTitle: { type: String, default: 'About KMC Connect' },
  aboutContent: { type: String, default: 'The Karachi Metropolitan Corporation (KMC) is committed to providing a clean, safe, and sustainable environment for all citizens. This portal serves as a direct bridge between you and the civic management.' },
  contactTitle: { type: String, default: 'Get in Touch' },
  contactContent: { type: String, default: 'Have a query that goes beyond reporting a complaint? Reach out to our dedicated civic task forces.' },
  testimonials: {
    type: [{ name: String, role: String, text: String, avatar: String }],
    default: [
      { name: 'Ali Raza', role: 'Resident, Gulshan-e-Iqbal', text: 'The KMC Connect app made reporting our street light issue incredibly easy. It was fixed within 48 hours!', avatar: 'https://i.pravatar.cc/150?u=1' },
      { name: 'Sara Ahmed', role: 'Business Owner, Saddar', text: 'Tracking my civic complaint directly from my phone brought transparency I had never seen before in Karachi.', avatar: 'https://i.pravatar.cc/150?u=2' },
      { name: 'M. Tariq', role: 'Activist, Lyari', text: 'The SLA escalation system actually works. Overdue complaints get immediate attention from higher authorities.', avatar: 'https://i.pravatar.cc/150?u=3' }
    ]
  }
}, { timestamps: true });

export const SiteContent = mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);

