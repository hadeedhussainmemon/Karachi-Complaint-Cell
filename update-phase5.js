const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, searchRegex, replaceText) {
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(searchRegex, replaceText);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  } catch (e) {
    console.error(`Error updating ${filePath}:`, e);
  }
}

// 1. Update UI Primitives (Cards, Buttons, Inputs)
// Buttons: Restrained radii (rounded-md instead of full/xl)
replaceInFile('src/components/ui/button.tsx', /rounded-full/g, 'rounded-md');
replaceInFile('src/components/ui/button.tsx', /rounded-xl/g, 'rounded-md');
replaceInFile('src/components/ui/button.tsx', /rounded-2xl/g, 'rounded-md');

// Inputs: Restrained radii
replaceInFile('src/components/ui/input.tsx', /rounded-full/g, 'rounded-md');
replaceInFile('src/components/ui/input.tsx', /rounded-xl/g, 'rounded-md');

// Cards: 8-12px radii (rounded-lg) and remove heavy glassmorphism
replaceInFile('src/components/ui/card.tsx', /rounded-xl/g, 'rounded-lg');
replaceInFile('src/components/ui/card.tsx', /rounded-2xl/g, 'rounded-lg');
replaceInFile('src/components/ui/card.tsx', /bg-white\\/5/g, 'bg-card');
replaceInFile('src/components/ui/card.tsx', /backdrop-blur-.*?\\s/g, '');

// 2. Bottom Navigation (Mobile)
// Make it a full-width solid bar attached to bottom, no floating pill
replaceInFile('src/components/BottomNav.tsx', /bottom-4 left-4 right-4/g, 'bottom-0 left-0 right-0');
replaceInFile('src/components/BottomNav.tsx', /rounded-2xl/g, 'rounded-none border-t');
replaceInFile('src/components/BottomNav.tsx', /bg-white\\/90 dark:bg-gray-900\\/90 backdrop-blur-lg/g, 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800');
replaceInFile('src/components/BottomNav.tsx', /shadow-lg/g, 'shadow-md');

// 3. Complaint Form
replaceInFile('src/app/complaint/page.tsx', /backdrop-blur-md bg-white\\/80 dark:bg-gray-900\\/80/g, 'bg-white dark:bg-gray-950 border-b');
replaceInFile('src/app/complaint/page.tsx', /rounded-3xl/g, 'rounded-xl');
replaceInFile('src/app/complaint/page.tsx', /rounded-2xl/g, 'rounded-lg');
replaceInFile('src/app/complaint/page.tsx', /bg-gray-50\\/50 dark:bg-gray-800\\/50 backdrop-blur-sm/g, 'bg-gray-50 dark:bg-gray-900');
// Form Inputs spacing
replaceInFile('src/app/complaint/page.tsx', /py-4/g, 'py-3');
replaceInFile('src/app/complaint/page.tsx', /px-6/g, 'px-4');

// 4. Admin Dashboard
replaceInFile('src/components/AdminComplaintsClient.tsx', /rounded-3xl/g, 'rounded-xl');
replaceInFile('src/components/AdminComplaintsClient.tsx', /rounded-2xl/g, 'rounded-lg');
replaceInFile('src/components/AdminComplaintsClient.tsx', /backdrop-blur-.*?\\s/g, ' ');
replaceInFile('src/components/AdminComplaintsClient.tsx', /bg-white\\/50/g, 'bg-white');
replaceInFile('src/components/AdminComplaintsClient.tsx', /bg-white\\/80/g, 'bg-white');
replaceInFile('src/components/AdminComplaintsClient.tsx', /dark:bg-gray-900\\/50/g, 'dark:bg-gray-950');

console.log('UI primitives and layout flows updated successfully.');
