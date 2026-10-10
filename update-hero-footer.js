const fs = require('fs');

// 1. Update Hero.tsx
try {
  let hero = fs.readFileSync('src/components/Hero.tsx', 'utf8');
  if (!hero.includes('export default function Hero({ content }: { content?: any }) {')) {
    hero = hero.replace(
      'export default function Hero() {',
      'export default function Hero({ content }: { content?: any }) {'
    );
    hero = hero.replace(/{t\('heroTitle1'\)}/g, "{content?.heroTitle1 || t('heroTitle1')}");
    hero = hero.replace(/{t\('heroTitle2'\)}/g, "{content?.heroTitle2 || t('heroTitle2')}");
    hero = hero.replace(/{t\('heroDesc'\)}/g, "{content?.heroDesc || t('heroDesc')}");
    hero = hero.replace(/{t\('exploreLocations'\)}/g, "{content?.exploreBtnText || t('exploreLocations')}");
    hero = hero.replace(/{t\('submitComplaintBtn'\)}/g, "{content?.submitBtnText || t('submitComplaintBtn')}");
    fs.writeFileSync('src/components/Hero.tsx', hero, 'utf8');
    console.log('Hero.tsx updated');
  }
} catch (e) { console.error('Error updating Hero:', e); }

// 2. Update Footer.tsx
try {
  let footer = fs.readFileSync('src/components/Footer.tsx', 'utf8');
  if (!footer.includes('export default function Footer({ content }: { content?: any }) {')) {
    footer = footer.replace(
      'export default function Footer() {',
      'export default function Footer({ content }: { content?: any }) {'
    );
    footer = footer.replace(
      'Bridging the gap between the Karachi Metropolitan Corporation and its citizens. Digitalizing civic services, promoting regional locations, and ensuring transparency.',
      '{content?.footerAbout || "Bridging the gap between the Karachi Metropolitan Corporation and its citizens. Digitalizing civic services, promoting regional locations, and ensuring transparency."}'
    );
    footer = footer.replace(
      'KMC Head Office, M.A. Jinnah Road, Karachi, Pakistan',
      '{content?.contactAddress || "KMC Head Office, M.A. Jinnah Road, Karachi, Pakistan"}'
    );
    fs.writeFileSync('src/components/Footer.tsx', footer, 'utf8');
    console.log('Footer.tsx updated');
  }
} catch (e) { console.error('Error updating Footer:', e); }
