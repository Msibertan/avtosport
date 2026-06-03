const fs = require('fs');
const path = require('path');

const filePath = path.join('C:', 'Users', 'genna', '.gemini', 'antigravity', 'scratch', 'Projects', 'Avtosport', 'src', 'app', 'reviews', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace rating: 5.0 with random 4.8, 4.9, 5.0
content = content.replace(/rating:\s*5\.0/g, () => {
    const ratings = ['4.8', '4.9', '5.0'];
    const randomIndex = Math.floor(Math.random() * ratings.length);
    return `rating: ${ratings[randomIndex]}`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Ratings updated successfully!');
