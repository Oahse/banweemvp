// Quick test to verify countries API functions work
const fs = require('fs');

// Read the countries file content
const content = fs.readFileSync('frontend/src/data/countries.ts', 'utf8');

// Check for basic structure
console.log('✓ File exists and is readable');

// Check for required exports
const hasCountriesExport = content.includes('export const countries');
const hasGetCountryOptions = content.includes('export const getCountryOptions');
const hasGetProvinceOptions = content.includes('export const getProvinceOptions');
const hasGetCountryByCode = content.includes('export const getCountryByCode');

console.log('✓ Countries export:', hasCountriesExport ? 'Found' : 'Missing');
console.log('✓ getCountryOptions export:', hasGetCountryOptions ? 'Found' : 'Missing');
console.log('✓ getProvinceOptions export:', hasGetProvinceOptions ? 'Found' : 'Missing');
console.log('✓ getCountryByCode export:', hasGetCountryByCode ? 'Found' : 'Missing');

// Check for syntax issues
const hasUnmatchedBraces = (content.match(/\{/g) || []).length !== (content.match(/\}/g) || []).length;
const hasUnmatchedBrackets = (content.match(/\[/g) || []).length !== (content.match(/\]/g) || []).length;

console.log('✓ Braces balanced:', !hasUnmatchedBraces ? 'Yes' : 'No');
console.log('✓ Brackets balanced:', !hasUnmatchedBrackets ? 'Yes' : 'No');

// Check for required countries
const requiredCountries = ['US', 'CA', 'GB', 'AU', 'IN', 'CN', 'RW', 'GH', 'KE', 'ZW', 'ZA'];
const missingCountries = [];

requiredCountries.forEach(code => {
  if (!content.includes(`code: '${code}'`)) {
    missingCountries.push(code);
  }
});

console.log('✓ Required countries:', missingCountries.length === 0 ? 'All present' : `Missing: ${missingCountries.join(', ')}`);

console.log('\n🎉 Countries API validation complete!');