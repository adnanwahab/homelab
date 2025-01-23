

import fs from 'fs';
import { JSDOM } from 'jsdom';

// Read and process the HTML file
const processHTML = () => {
  try {
    const html = fs.readFileSync('sim-as-a-service.html', 'utf-8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract relevant text content
    const pageData = {
      title: document.title || '',
      hero: {
        heading: document.querySelector('h1')?.textContent || '',
        subheading: document.querySelector('h2')?.textContent || '',
      },
      sections: Array.from(document.querySelectorAll('section')).map(section => ({
        title: section.querySelector('h2, h3')?.textContent || '',
        content: section.textContent?.trim() || '',
      })),
      footer: document.querySelector('footer')?.textContent || '',
    };

    // Save the extracted data as JSON
    fs.writeFileSync('pageData.json', JSON.stringify(pageData, null, 2));

    // Generate new simplified landing page
    const newHTML = generateLandingPage(pageData);
    fs.writeFileSync('simplified-landing.html', newHTML);

    console.log('Processing completed! Check pageData.json and simplified-landing.html');
  } catch (error) {
    console.error('Error processing HTML:', error);
  }
};

// Generate new landing page with Tailwind CSS
const generateLandingPage = (data: any) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                ${data.hero.heading}
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
                ${data.hero.subheading}
            </p>
        </div>
    </div>

    <!-- Content Sections -->
    ${data.sections.map(section => `
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
                ${section.title}
            </h2>
            <div class="prose prose-lg">
                ${section.content}
            </div>
        </div>
    </section>
    `).join('')}

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            ${data.footer}
        </div>
    </footer>
</body>
</html>
  `;
};

// Run the script
processHTML();