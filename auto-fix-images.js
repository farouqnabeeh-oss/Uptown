const fs = require('fs');

let fileContent = fs.readFileSync('src/lib/seed-data.ts', 'utf8');

const urls = [...fileContent.matchAll(/\/images\/([^'\"?]+)/g)].map(m => m[1]);
const allFiles = fs.readdirSync('public/images');
const missing = urls.filter(u => !allFiles.includes(u));

console.log('Total URLs found in seed:', urls.length);
console.log('Total Files in public/images:', allFiles.length);
console.log('Missing Images count:', missing.length);

if (missing.length > 0) {
    let replacedCount = 0;
    
    missing.forEach(missingImg => {
        // e.g. "crispy-chicken-sandwich" from "crispy-chicken-sandwich__n9p2.jpg"
        const basePattern = missingImg.split('__')[0].replace(/-/g, '.*'); 
        const regex = new RegExp('.*' + basePattern + '.*', 'i');
        
        let match = allFiles.find(f => regex.test(f));
        
        // If not found, try a looser match just based on words
        if (!match) {
             const words = missingImg.split('__')[0].split('-');
             if (words.length > 0 && words[0]) {
                 match = allFiles.find(f => f.includes(words[0]));
             }
        }
        
        if (match) {
            console.log(`Fixing [${missingImg}] -> [${match}]`);
            // Replace globally in the file content
            const replaceRegex = new RegExp('/images/' + missingImg.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g');
            fileContent = fileContent.replace(replaceRegex, '/images/' + match);
            replacedCount++;
        } else {
            console.log(`❌ Could not find a match for [${missingImg}]`);
        }
    });
    
    if (replacedCount > 0) {
        fs.writeFileSync('src/lib/seed-data.ts', fileContent, 'utf8');
        console.log(`Successfully updated ${replacedCount} broken image paths in seed-data.ts.`);
    }
} else {
    console.log('All images match successfully! Nothing to fix.');
}
