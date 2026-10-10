import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Complaint from '@/models/Complaint';
import { karachiDistricts, karachiTowns } from '@/lib/karachiData';

export async function GET() {
  try {
    await dbConnect();
    
    // Clear old test data
    await Complaint.deleteMany({});

    const now = new Date();
    const past48Hours = new Date(now.getTime() - (50 * 60 * 60 * 1000)); // 50 hours ago (Overdue)
    const past24Hours = new Date(now.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago (Normal)

    const dummyComplaints = [
      {
        complaintId: 'KMC-' + Math.floor(10000 + Math.random() * 90000),
        name: 'Ahmed Ali',
        email: 'ahmed@example.com',
        phone: '03001234567',
        category: 'Sewerage & Drainage',
        priority: 'urgent',
        description: 'Main gutter is overflowing near the main road. Water has entered houses.',
        district: 'District South',
        town: 'Saddar Town',
        area: 'Burns Road, Street 4',
        status: 'submitted',
        assignedTo: 'KW&SB Taskforce',
        images: ['https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400'],
        coordinates: { lat: 24.8569, lng: 67.0122 },
        isEscalated: false, // Will trigger monsoon mode but not escalated yet
        slaDeadline: new Date(now.getTime() + (24 * 60 * 60 * 1000)),
        createdAt: now
      },
      {
        complaintId: 'KMC-' + Math.floor(10000 + Math.random() * 90000),
        name: 'Fatima Sheikh',
        email: 'fatima@example.com',
        phone: '03331122334',
        category: 'Electricity Outage',
        priority: 'high',
        description: 'Wire broke down during rain. High risk of electrocution.',
        district: 'District Central',
        town: 'Gulberg Town',
        area: 'Block 13, FB Area',
        status: 'under_review',
        assignedTo: 'K-Electric Liaison',
        images: [],
        coordinates: { lat: 24.9351, lng: 67.0784 },
        isEscalated: true, // ESCALATED OVERDUE
        slaDeadline: past48Hours, // Expired
        createdAt: new Date(now.getTime() - (52 * 60 * 60 * 1000))
      },
      {
        complaintId: 'KMC-' + Math.floor(10000 + Math.random() * 90000),
        name: 'Karachi Citizen',
        email: 'citizen@gmail.com',
        phone: '03119988776',
        category: 'Road Damage',
        priority: 'medium',
        description: 'Huge pothole created after recent construction.',
        district: 'District East',
        town: 'Gulshan Town',
        area: 'Block 4, Gulshan-e-Iqbal',
        status: 'in_progress',
        assignedTo: 'Town Operations',
        images: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400'],
        coordinates: { lat: 24.9180, lng: 67.0971 },
        isEscalated: false,
        slaDeadline: new Date(now.getTime() + (12 * 60 * 60 * 1000)),
        createdAt: past24Hours
      },
      {
        complaintId: 'KMC-' + Math.floor(10000 + Math.random() * 90000),
        name: 'Imran Tariq',
        email: 'imran@example.com',
        phone: '03445556667',
        category: 'Water Supply',
        priority: 'high',
        description: 'No water line supply for 2 weeks in our sector.',
        district: 'District West',
        town: 'Orangi Town',
        area: 'Sector 11-E',
        status: 'resolved',
        assignedTo: 'KW&SB Taskforce',
        images: [],
        coordinates: { lat: 24.9500, lng: 66.9950 },
        isEscalated: false,
        slaDeadline: new Date(now.getTime() + (48 * 60 * 60 * 1000)),
        createdAt: past24Hours
      }
    ];

    await Complaint.insertMany(dummyComplaints);

    return NextResponse.json({ 
      success: true, 
      message: 'KMC Database Seeded Successfully!',
      inserted: dummyComplaints.length 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

