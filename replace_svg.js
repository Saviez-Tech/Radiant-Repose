const fs = require('fs');

function replaceSvg(filename) {
  let content = fs.readFileSync(filename, 'utf8');
  let newContent = content.replace(/<path d="[A-Za-z0-9\s\.\-]+?" fill="black" fill-opacity="0\.8"\/>/g, (match) => {
    return '<!-- ' + match + ' -->';
  });
  
  if (filename.includes('responsive-services.svg')) {
    const textGroup = `
<g font-family="Outfit, Inter, sans-serif" font-size="15" fill="black" fill-opacity="0.8" font-weight="500">
  <text x="60" y="101">Curated Children's Collection</text>
  <text x="60" y="137.5">Premium School Essentials</text>
  <text x="60" y="173.5">Luxury Gifts &amp; Hampers</text>
  <text x="60" y="209.5">Kitchen &amp; Dining Essentials</text>
  <text x="60" y="245.5">Home Living Collection</text>
  <text x="60" y="282">Baby &amp; Nursery Collection</text>
  <text x="60" y="318">Fashion &amp; Lifestyle Accessories</text>
  <text x="60" y="354">Authentic Turkish Imports</text>
  <text x="60" y="390">Premium Chinese Imports</text>
  <text x="60" y="426.5">Fast Nationwide Delivery</text>
</g>`;
    newContent = newContent.replace('</svg>', textGroup + '\n</svg>');
  } else {
    const textGroup = `
<g font-family="Outfit, Inter, sans-serif" font-size="19" fill="black" fill-opacity="0.8" font-weight="500">
  <text x="55" y="65">Curated Children's Collection</text>
  <text x="55" y="105">Premium School Essentials</text>
  <text x="55" y="145">Luxury Gifts &amp; Hampers</text>
  <text x="55" y="185">Kitchen &amp; Dining Essentials</text>
  <text x="55" y="225">Home Living Collection</text>
  <text x="390" y="65">Baby &amp; Nursery Collection</text>
  <text x="390" y="105">Fashion &amp; Lifestyle Accessories</text>
  <text x="390" y="145">Authentic Turkish Imports</text>
  <text x="390" y="185">Premium Chinese Imports</text>
  <text x="390" y="225">Fast Nationwide Delivery</text>
</g>`;
    newContent = newContent.replace('</svg>', textGroup + '\n</svg>');
  }
  
  fs.writeFileSync(filename, newContent);
}

replaceSvg('public/icons/services.svg');
replaceSvg('public/icons/responsive-services.svg');
