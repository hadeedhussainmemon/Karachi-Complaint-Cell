import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'KMC Connect - Karachi Metropolitan Corporation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #0f766e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '120px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ background: '#10b981', padding: '10px 20px', borderRadius: '12px', marginRight: '20px' }}>
            <span style={{ fontSize: 30, fontWeight: 900, color: '#020617' }}>KMC</span>
          </div>
          <h2 style={{ fontSize: 40, fontWeight: 600, color: '#a7f3d0' }}>Karachi Metropolitan Corporation</h2>
        </div>
        
        <h1 style={{ fontSize: 80, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: '30px' }}>
          KMC Connect <br/> Citizen Portal
        </h1>
        
        <p style={{ fontSize: 36, color: '#e2e8f0', maxWidth: '800px', lineHeight: 1.4 }}>
          Report civic issues, track complaints in real-time, and help us build a better Karachi.
        </p>

        <div style={{ display: 'flex', marginTop: '60px', gap: '30px', borderTop: '2px solid rgba(255,255,255,0.2)', paddingTop: '40px', width: '100%' }}>
          <span style={{ fontSize: 24, fontWeight: 'bold' }}>📍 KMC Head Office, Karachi</span>
          <span style={{ fontSize: 24, fontWeight: 'bold' }}>📞 1339 Helpline</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
