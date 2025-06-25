// scripts/convert-logo.js
// Run this script to convert your SVG logo to base64
import fs from 'fs';
import path from 'path';

// Read the SVG file
const svgPath = path.join(process.cwd(), 'public', 'PPL-Logo.svg')
const svgContent = fs.readFileSync(svgPath, 'utf8')

// Convert to base64
const base64 = Buffer.from(svgContent).toString('base64')
const dataUri = `data:image/svg+xml;base64,${base64}`

console.log('Base64 Data URI:')
console.log(dataUri)

// Optionally, save to a file
fs.writeFileSync('logo-base64.txt', dataUri)
console.log('\nSaved to logo-base64.txt')

// Usage in your OG image components:
console.log('\nUse this in your OG image components:')
console.log(`const LOGO_BASE64 = '${dataUri}'`)

// Run with: node --experimental-modules scripts/convert-logo.js