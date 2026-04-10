const fs = require('fs');
const file = fs.readFileSync('src/lib/seed-data.ts', 'utf8');
const urls = [...file.matchAll(/\/images\/([^'\"?]+)/g)].map(m => m[1]);
const allFiles = fs.readdirSync('public/images');
const missing = urls.filter(u => !allFiles.includes(u));
console.log('Total URLs found in seed:', urls.length);
console.log('Total Files in public/images:', allFiles.length);
if (missing.length > 0) {
    console.log('Missing Images:', missing);
} else {
    console.log('All images match successfully!');
}
