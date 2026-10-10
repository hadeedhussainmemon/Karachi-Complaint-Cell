const fs = require('fs');

try {
  let seed = fs.readFileSync('src/app/api/seed/route.ts', 'utf8');

  // Replace Locations
  seed = seed.replace(/Gwadar District/g, 'Korangi District');
  seed = seed.replace(/Astola Island.*?nest\./g, 'Korangi Creek is a major industrial and coastal area in Karachi, playing a key role in the city\\'s economy and maritime activities.');
  seed = seed.replace(/Coastal Point/g, 'Coastal Area');
  seed = seed.replace(/Hub District/g, 'South District');
  seed = seed.replace(/Gadani Cliffs & Beach/g, 'Clifton Beach');
  seed = seed.replace(/Famous for its dramatic rocky coastline.*?world\./g, 'Clifton Beach, also known as Sea View, is one of Karachi\\'s most famous public beaches, offering camel rides, street food, and stunning sunsets over the Arabian Sea.');
  seed = seed.replace(/Quetta District/g, 'Central District');
  seed = seed.replace(/Hanna Lake/g, 'Frere Hall');
  seed = seed.replace(/Hanna Lake is a picturesque.*?families\./g, 'Frere Hall is one of the many remnant buildings of the British colonial era that still exists in Karachi, Sindh. It serves as an exhibition space and a public library.');
  seed = seed.replace(/Natural Attraction/g, 'Historical Landmark');

  // Replace News
  seed = seed.replace(/Ziarat/g, 'Lyari');
  seed = seed.replace(/Balochi and Pashtun traditional dances.*?legends\./g, 'Sindhi cultural displays, street art exhibitions, football tournaments, and local food stalls.');
  seed = seed.replace(/QESCO/g, 'K-Electric');
  seed = seed.replace(/Quetta, Khuzdar, and Mastung/g, 'Malir, Korangi, and East Karachi');
  seed = seed.replace(/Mir Sarfraz Bugti/g, 'the Mayor of Karachi');

  // Replace Events
  seed = seed.replace(/Quetta Cultural Craft & Sajji Mela/g, 'Karachi Eat Food Festival');
  seed = seed.replace(/Askari Park Exhibition Grounds, Quetta/g, 'Beach View Park, Clifton');
  seed = seed.replace(/Quetta special Sajji/g, 'Karachi special Biryani');
  seed = seed.replace(/Juniper Forest Reserve, Ziarat Valley/g, 'Bagh Ibne Qasim, Clifton');
  seed = seed.replace(/ancient Juniper forests/g, 'expansive coastal parks');

  fs.writeFileSync('src/app/api/seed/route.ts', seed, 'utf8');
  console.log('Seed file updated successfully for Karachi!');
} catch (e) {
  console.error(e);
}
