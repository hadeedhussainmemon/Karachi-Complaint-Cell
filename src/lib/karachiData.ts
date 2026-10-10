export const karachiDistricts = [
  'District South',
  'District East',
  'District Central',
  'District West',
  'District Malir',
  'District Korangi',
  'District Keamari'
];

export const karachiTowns: Record<string, string[]> = {
  'District South': ['Saddar Town', 'Lyari Town'],
  'District East': ['Gulshan Town', 'Jamshed Town', 'Gulistan-e-Johar'],
  'District Central': ['Gulberg Town', 'Liaquatabad Town', 'North Nazimabad Town', 'New Karachi Town'],
  'District West': ['Orangi Town', 'SITE Town', 'Baldia Town', 'Manghopir'],
  'District Malir': ['Malir Town', 'Bin Qasim Town', 'Gadap Town', 'Ibrahim Hyderi'],
  'District Korangi': ['Korangi Town', 'Landhi Town', 'Shah Faisal Town', 'Model Colony'],
  'District Keamari': ['Keamari Town', 'Mauripur Town', 'Hawkesbay']
};

export const townRepresentatives: Record<string, { name: string; role: string; phone: string; image: string }> = {
  'Saddar Town': { name: 'Mansoor Ali', role: 'Town Chairman', phone: '021-99211234', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' },
  'Lyari Town': { name: 'Nasir Baloch', role: 'Town Chairman', phone: '021-99211235', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop' },
  'Gulshan Town': { name: 'Fahad Ahmed', role: 'Town Chairman', phone: '021-99211236', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' },
  'Jamshed Town': { name: 'Tariq Mehmood', role: 'Town Chairman', phone: '021-99211237', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  'Gulberg Town': { name: 'Farooq Khan', role: 'Town Chairman', phone: '021-99211238', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  'North Nazimabad Town': { name: 'Rehan Hashmi', role: 'Town Chairman', phone: '021-99211239', image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop' },
  'Orangi Town': { name: 'Asif Khan', role: 'Town Chairman', phone: '021-99211240', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' },
  'default': { name: 'KMC Central Desk', role: 'KMC Representative', phone: '1339 (KMC Helpline)', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop' }
};
