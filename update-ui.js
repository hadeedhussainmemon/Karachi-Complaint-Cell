const fs = require('fs');

// 1. Cleanup Hero.tsx
try {
  let hero = fs.readFileSync('src/components/Hero.tsx', 'utf8');
  hero = hero.replace(/relative w-full overflow-hidden.*?pt-12/g, 'relative w-full bg-background pt-16');
  // Remove all blurs
  hero = hero.replace(/<div className=\"absolute.*?blur-3xl.*?><\/div>/g, ''); 
  hero = hero.replace(/<div className=\"absolute.*?blur-3xl.*?<\/div>/g, ''); 
  
  hero = hero.replace(/bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent/g, 'text-secondary');
  hero = hero.replace(/text-4xl sm:text-5xl lg:text-6xl font-extrabold/g, 'text-4xl md:text-5xl font-bold');
  hero = hero.replace(/shadow-md shadow-primary\/20 ring-1 ring-primary\/50/g, 'shadow-sm');
  hero = hero.replace(/rounded-full/g, 'rounded-md');
  hero = hero.replace(/rounded-2xl/g, 'rounded-xl'); 
  fs.writeFileSync('src/components/Hero.tsx', hero, 'utf8');
} catch (e) {
  console.log('Error modifying Hero.tsx', e);
}

// 2. Cleanup Navbar.tsx
try {
  let nav = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
  nav = nav.replace(/backdrop-blur-md bg-white\/80 dark:bg-gray-950\/80/g, 'bg-primary border-b border-primary-foreground/10 text-white');
  nav = nav.replace(/text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary/g, 'text-white/80 hover:text-accent');
  nav = nav.replace(/text-gray-900 dark:text-white/g, 'text-white');
  nav = nav.replace(/from-primary to-accent bg-clip-text text-transparent/g, 'text-white');
  nav = nav.replace(/bg-primary hover:bg-primary\/90/g, 'bg-accent text-primary hover:bg-accent/90 font-medium');
  fs.writeFileSync('src/components/Navbar.tsx', nav, 'utf8');
} catch (e) {
  console.log('Error modifying Navbar.tsx', e);
}
