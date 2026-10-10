const fs = require('fs');

// 1. Fix TranslationKey in translations.ts
try {
  let trans = fs.readFileSync('src/lib/translations.ts', 'utf8');
  if (!trans.includes('export type TranslationKey')) {
    trans += '\nexport type TranslationKey = keyof typeof translations.en;\n';
    fs.writeFileSync('src/lib/translations.ts', trans, 'utf8');
  }
} catch (e) { console.error('Error fixing TranslationKey', e); }

// 2. Fix dbConnect imports
const files = [
  'src/app/api/cms/route.ts',
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/contact/page.tsx'
];
files.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      content = content.replace(/import\s*\{\s*dbConnect\s*\}\s*from\s*['"]@\/lib\/dbConnect['"];?/g, "import dbConnect from '@/lib/dbConnect';");
      fs.writeFileSync(file, content, 'utf8');
    }
  } catch (err) {
    console.error('Error fixing dbConnect in ' + file, err);
  }
});

// 3. Fix contentProps in page.tsx
try {
  let page = fs.readFileSync('src/app/page.tsx', 'utf8');
  if (!page.includes('const contentProps =')) {
    page = page.replace(
      'let cmsContent = await SiteContent.findOne();',
      'let cmsContent = await SiteContent.findOne();\n  const contentProps = cmsContent ? JSON.parse(JSON.stringify(cmsContent)) : {};'
    );
    fs.writeFileSync('src/app/page.tsx', page, 'utf8');
  }
} catch (e) { console.error('Error fixing contentProps', e); }
