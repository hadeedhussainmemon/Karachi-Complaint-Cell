const fs = require('fs');

// 1. Fix missing keys in translations.ts
try {
  let trans = fs.readFileSync('src/lib/translations.ts', 'utf8');
  if (!trans.includes('personalInfo:')) {
    trans = trans.replace(
      /submitComplaintBtn: 'Submit Complaint',/g,
      "submitComplaintBtn: 'Submit Complaint',\n    personalInfo: 'Personal Information',\n    geographicDetails: 'Geographic Details',\n    complaintDescription: 'Complaint Description',\n    attachEvidence: 'Attach Evidence (Optional)',"
    );
    trans = trans.replace(
      /submitComplaintBtn: 'شکایت درج کریں',/g,
      "submitComplaintBtn: 'شکایت درج کریں',\n    personalInfo: 'ذاتی معلومات',\n    geographicDetails: 'جغرافیائی تفصیلات',\n    complaintDescription: 'شکایت کی تفصیل',\n    attachEvidence: 'ثبوت منسلک کریں (اختیاری)',"
    );
    fs.writeFileSync('src/lib/translations.ts', trans, 'utf8');
    console.log('Fixed translations.ts');
  }
} catch (e) { console.log(e); }

// 2. Fix page.tsx contentProps issue
try {
  let page = fs.readFileSync('src/app/page.tsx', 'utf8');
  if (!page.includes('const contentProps = cmsContent')) {
    page = page.replace(
      /return \(\s*<main/g,
      'const contentProps = typeof cmsContent !== "undefined" && cmsContent ? JSON.parse(JSON.stringify(cmsContent)) : {};\n  return (\n    <main'
    );
    fs.writeFileSync('src/app/page.tsx', page, 'utf8');
    console.log('Fixed page.tsx');
  } else {
    // If it was already there but out of scope, maybe it's declared globally or wrongly?
    // Let's force replace all contentProps definitions
    page = page.replace(/const contentProps = cmsContent \? JSON\.parse\(JSON\.stringify\(cmsContent\)\) : \{\};/g, '');
    page = page.replace(
      /return \(\s*<main/g,
      'const contentProps = typeof cmsContent !== "undefined" && cmsContent ? JSON.parse(JSON.stringify(cmsContent)) : {};\n  return (\n    <main'
    );
    fs.writeFileSync('src/app/page.tsx', page, 'utf8');
    console.log('Re-fixed page.tsx scope');
  }
} catch (e) { console.log(e); }
