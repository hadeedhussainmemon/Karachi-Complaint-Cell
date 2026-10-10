const fs = require('fs');

// 1. Create a Client Component wrapper for Server Components to use translation
const tComponentCode = `'use client';
import { useLanguage } from '@/components/LanguageProvider';
import { TranslationKey } from '@/lib/translations';

export default function T({ tKey, className }: { tKey: TranslationKey, className?: string }) {
  const { t } = useLanguage();
  if (className) return <span className={className}>{t(tKey as any)}</span>;
  return <>{t(tKey as any)}</>;
}
`;
fs.writeFileSync('src/components/T.tsx', tComponentCode);

// 2. Expand translations.ts
let trans = fs.readFileSync('src/lib/translations.ts', 'utf8');

const enKeys = `
    statsResolution: 'Resolution Rate',
    statsActive: 'Active Dispatch',
    statsDistricts: 'Districts Tracked',
    statsResolved: 'Complaints Resolved',
    statsCases: 'Active Cases',
    statsCitizens: 'Registered Citizens',
    discoverKarachi: 'Discover Karachi',
    featuredLocations: 'Featured Beautiful Locations',
    exploreWonders: 'Explore the natural wonders, historical landmarks, and beautiful beaches of Pakistan\\'s largest megacity.',
    viewAllLocations: 'View All Locations',
    transparentProcess: 'Transparent Process',
    howItWorks: 'How the Service Works',
    processDesc: 'We provide an open, transparent, and direct bridge between citizen reports and administrative offices.',
    step1: 'Step 01',
    step1Title: 'Submit Complaint',
    step1Desc: 'Fill out our modern multi-step form detailing the civic issue. Upload photo/video evidence and optionally pinpoint the GPS location.',
    step2: 'Step 02',
    step2Title: 'Complaint Review',
    step2Desc: 'Operations team reviews the complaint within hours, categorizing it, verifying the details, and updating its status to "Under Review".',
    step3: 'Step 03',
    step3Title: 'Assigned Authority',
    step3Desc: 'The complaint is automatically dispatched to the relevant department (e.g., K-Electric, KWSB) with custom logs.',
    step4: 'Step 04',
    step4Title: 'Resolution & Closure',
    step4Desc: 'Field technicians perform the maintenance, upload proof of repair, and mark the complaint resolved. Citizens track the progress.',
    govUpdates: 'Government Updates',
    latestNews: 'Latest Announcements & News',
    allNews: 'All News',
    culturalCalendar: 'Cultural Calendar',
    upcomingEvents: 'Upcoming Events',
    allEvents: 'All Events',
    citizenVoice: 'Citizen Voice',
    feedbackCommunity: 'Feedback from Our Community',
    feedbackDesc: 'Hear from citizens across Karachi who resolved their neighborhood concerns using our digital services.',
    submitFirst: 'Submit and Track Your First Complaint Online',
    makeBetter: 'Make your neighborhood a cleaner, safer, and better place. File reports in less than 5 minutes and track direct resolutions.',
    civicServices: 'Civic Services',
    helplineDirectory: 'Helpline Directory',
    platformMission: 'Platform Mission',
    explore: 'Explore',
    adminTeam: 'Administration Team',
    itDept: 'IT Department HQ',
    devBy: 'Developed by IT Department, Karachi Metropolitan Corporation.',
    officialPortal: 'Official Government Portal',
    staffPortal: 'Staff Portal',
`;

const urKeys = `
    statsResolution: 'حل کی شرح',
    statsActive: 'فعال ڈسپیچ',
    statsDistricts: 'زیر نگرانی اضلاع',
    statsResolved: 'حل شدہ شکایات',
    statsCases: 'زیر التوا کیسز',
    statsCitizens: 'رجسٹرڈ شہری',
    discoverKarachi: 'کراچی دریافت کریں',
    featuredLocations: 'اہم اور خوبصورت مقامات',
    exploreWonders: 'پاکستان کے سب سے بڑے شہر کے قدرتی عجائبات، تاریخی مقامات اور ساحلوں کو دریافت کریں۔',
    viewAllLocations: 'تمام مقامات دیکھیں',
    transparentProcess: 'شفاف طریقہ کار',
    howItWorks: 'یہ سروس کیسے کام کرتی ہے',
    processDesc: 'ہم شہریوں کی شکایات اور انتظامی دفاتر کے درمیان ایک کھلا اور براہ راست رابطہ فراہم کرتے ہیں۔',
    step1: 'پہلا قدم',
    step1Title: 'شکایت درج کریں',
    step1Desc: 'فارم پُر کر کے شہری مسائل کی تفصیل بتائیں۔ ثبوت کے طور پر تصویر/ویڈیو اور GPS لوکیشن شامل کریں۔',
    step2: 'دوسرا قدم',
    step2Title: 'شکایت کا جائزہ',
    step2Desc: 'آپریشنز ٹیم چند گھنٹوں میں شکایت کا جائزہ لے کر اس کی تصدیق کرتی ہے اور اسٹیٹس کو "زیرِ جائزہ" کر دیتی ہے۔',
    step3: 'تیسرا قدم',
    step3Title: 'متعلقہ محکمے کی تفویض',
    step3Desc: 'شکایت کو متعلقہ محکمے (جیسے K-Electric یا KWSB) کو فوری طور پر بھیج دیا جاتا ہے۔',
    step4: 'چوتھا قدم',
    step4Title: 'حل اور تکمیل',
    step4Desc: 'محکمے کی ٹیم کام مکمل کرتی ہے، ثبوت اپلوڈ کرتی ہے اور شکایت حل ہو جاتی ہے۔ شہری ہر قدم ٹریک کر سکتے ہیں۔',
    govUpdates: 'حکومتی اپڈیٹس',
    latestNews: 'تازہ ترین اعلانات اور خبریں',
    allNews: 'تمام خبریں',
    culturalCalendar: 'ثقافتی کیلنڈر',
    upcomingEvents: 'آنے والے ایونٹس',
    allEvents: 'تمام ایونٹس',
    citizenVoice: 'شہریوں کی آواز',
    feedbackCommunity: 'کمیونٹی کے تاثرات',
    feedbackDesc: 'کراچی کے ان شہریوں کی رائے جانیں جنہوں نے اس سروس کے ذریعے اپنے مسائل حل کروائے۔',
    submitFirst: 'اپنی پہلی شکایت درج اور ٹریک کریں',
    makeBetter: 'اپنے محلے کو بہتر بنائیں۔ 5 منٹ سے بھی کم وقت میں رپورٹ درج کریں اور حل کو ٹریک کریں۔',
    civicServices: 'عوامی سہولیات',
    helplineDirectory: 'ہیلپ لائن ڈائریکٹری',
    platformMission: 'پلیٹ فارم کا مقصد',
    explore: 'دریافت کریں',
    adminTeam: 'انتظامی ٹیم',
    itDept: 'آئی ٹی ڈیپارٹمنٹ',
    devBy: 'کراچی میٹروپولیٹن کارپوریشن کے آئی ٹی ڈیپارٹمنٹ کے زیرِ اہتمام۔',
    officialPortal: 'سرکاری ویب پورٹل',
    staffPortal: 'اسٹاف پورٹل',
`;

if (!trans.includes('statsResolution:')) {
  trans = trans.replace(
    /submitComplaintBtn:\s*'Submit Complaint',/g,
    "submitComplaintBtn: 'Submit Complaint',\n" + enKeys
  );
  trans = trans.replace(
    /submitComplaintBtn:\s*'شکایت درج کریں',/g,
    "submitComplaintBtn: 'شکایت درج کریں',\n" + urKeys
  );
  fs.writeFileSync('src/lib/translations.ts', trans, 'utf8');
}
