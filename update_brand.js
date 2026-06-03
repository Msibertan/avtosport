const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(projectDir).filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));

// Define replacements
const replacements = [
    { old: /Sapfyr/g, new: 'Волга-Авто' },
    { old: /\/photo_2026-04-21_12-30-15-removebg-preview\.png/g, new: '/image_2026-05-19_11-32-30.png' },
    { old: /info@support-sapffir\.ru/g, new: 'volga.avto@ro.ru' } // Assuming this is also changed, or leave it?
];

console.log('Starting brand replace script...');

allFiles.forEach(fullPath => {
    let content = fs.readFileSync(fullPath, 'utf8');
    let originalContent = content;
    
    replacements.forEach(rep => {
        content = content.replace(rep.old, rep.new);
    });
    
    if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
    }
});

console.log('Done replacing brand data.');
