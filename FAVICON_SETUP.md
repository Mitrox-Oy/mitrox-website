# Favicon Setup for Google Search

## Google's Requirements

Google recommends favicons in the following sizes:
- **At least 8x8 pixels** (minimum requirement)
- **Larger than 48x48 pixels** (recommended)
- **64x64 pixels** (optimal size for Google Search)
- **96x96 pixels** (for high-DPI displays)

## Files Needed

Create the following favicon files in the `public/` directory:

1. **favicon.ico** - Multi-size ICO file containing at least 64x64px (primary for Google Search)
2. **favicon-64x64.png** - 64x64 pixels, PNG format (recommended size for Google Search)
3. **favicon-96x96.png** - 96x96 pixels, PNG format (for high-DPI displays)
4. **favicon.svg** - SVG format (scalable, for modern browsers)
5. **apple-touch-icon.png** - 180x180 pixels (for iOS devices)

## How to Create Favicons

### Option 1: Using Online Tools
1. Go to https://realfavicongenerator.net/ or https://favicon.io/
2. Upload your logo/image
3. Generate all sizes
4. Download and place files in the `public/` directory

### Option 2: Using Image Editing Software
1. Start with a high-resolution square image (at least 512x512px)
2. Create PNG files in each required size:
   - 48x48px → `favicon-48x48.png`
   - 96x96px → `favicon-96x96.png`
   - 144x144px → `favicon-144x144.png`
   - 32x32px → `favicon-32x32.png`
   - 16x16px → `favicon-16x16.png`
   - 180x180px → `apple-touch-icon.png`
3. Create a multi-size ICO file → `favicon.ico`

### Option 3: Using Command Line (ImageMagick)
```bash
# If you have ImageMagick installed
convert logo.png -resize 48x48 favicon-48x48.png
convert logo.png -resize 96x96 favicon-96x96.png
convert logo.png -resize 144x144 favicon-144x144.png
convert logo.png -resize 32x32 favicon-32x32.png
convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 180x180 apple-touch-icon.png
```

## Important Notes

1. **File Location**: All favicon files must be in the `public/` directory (root of your website)
2. **File Format**: PNG format is recommended for Google Search
3. **Square Images**: Favicons must be square (same width and height)
4. **Accessibility**: Make sure files are not blocked by robots.txt
5. **File Names**: Use exact file names as specified in index.html

## Verification

After adding the files:

1. **Check Accessibility**: Visit `https://mitrox.io/favicon-96x96.png` - it should load
2. **Check robots.txt**: Make sure favicon files are not blocked
3. **Google Search Console**: 
   - Go to Google Search Console
   - Submit your sitemap
   - Request indexing for your homepage
   - It may take a few days for Google to update the favicon

## Current Status

The HTML has been updated to reference the proper favicon sizes. You now need to:
1. Create the favicon image files in the required sizes
2. Place them in the `public/` directory
3. Wait for Google to recrawl your site (or request re-indexing in Search Console)

