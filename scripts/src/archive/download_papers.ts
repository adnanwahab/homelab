// const papers = [
//     "https://arxiv.org/pdf/2405.02811",
//     "https://arxiv.org/pdf/2405.03807",
//     "https://arxiv.org/pdf/2405.00236",
//     "https://arxiv.org/pdf/2404.03843",
//     "https://arxiv.org/pdf/2404.19531",
//     "https://arxiv.org/pdf/2310.08710",
//     "https://arxiv.org/pdf/2309.16889",
//     "https://arxiv.org/pdf/2309.16534",
//     "https://arxiv.org/pdf/2309.14491",
//     "https://arxiv.org/pdf/2309.16870",
//     "https://arxiv.org/pdf/2309.14003",
//     "https://arxiv.org/pdf/2305.12032",
//     "https://arxiv.org/pdf/2304.02163",
//     "https://arxiv.org/pdf/2306.03083",
//     "https://arxiv.org/pdf/2212.03267",
//     "https://arxiv.org/pdf/2306.04745",
//     "https://arxiv.org/pdf/2306.03206",
//     "https://arxiv.org/abs/2306.01075",
//     "https://arxiv.org/pdf/2207.05844",
//     "https://arxiv.org/pdf/2210.13488",
//     "https://arxiv.org/pdf/2304.03834",
//     "https://arxiv.org/pdf/2212.11419",
//     "https://arxiv.org/pdf/2212.07729",
//     "http://arxiv.org/pdf/2212.08710",
//     "https://arxiv.org/pdf/2212.01375",
//     "https://arxiv.org/pdf/2212.06968",
//     "https://arxiv.org/pdf/2210.09539",
//     "https://arxiv.org/pdf/2210.08375",
//     "https://arxiv.org/pdf/2210.13428",
//     "https://arxiv.org/pdf/2210.08113",
//     "https://arxiv.org/pdf/2210.08061",
//     "https://arxiv.org/pdf/2210.08064",
//     "https://arxiv.org/pdf/2210.09267",
//     "https://arxiv.org/pdf/2206.07704",
//     "https://arxiv.org/pdf/2210.07372",
//     "https://arxiv.org/pdf/2210.05018",
//     "https://arxiv.org/pdf/2207.03586",
//     "https://arxiv.org/pdf/2206.04176",
//     "https://arxiv.org/pdf/2208.06062",
//     "http://arxiv.org/pdf/2206.01738v1",
//     "https://arxiv.org/pdf/2206.07705",
//     "http://arxiv.org/pdf/2202.05263v1",
//     "https://arxiv.org/pdf/2206.04831.pdf",
//     "http://arxiv.org/pdf/2206.03970v1",
//     "http://arxiv.org/pdf/2206.03666v1",
//     "http://arxiv.org/pdf/2206.00991v1",
//     "http://arxiv.org/pdf/2205.05703v1",
//     "http://arxiv.org/pdf/2205.04624v1",
//     "http://arxiv.org/pdf/2205.03195v1",
//     "http://arxiv.org/pdf/2204.12511v2",
//     "http://arxiv.org/pdf/2203.12683v1",
//     "http://arxiv.org/pdf/2203.03875v1",
//     "http://arxiv.org/pdf/2201.05938v2",
//     "http://arxiv.org/pdf/2112.12141v1",
//     "http://arxiv.org/pdf/2112.07787v1",
//     "http://arxiv.org/pdf/2111.14973v3",
//     "http://arxiv.org/pdf/2109.01066v1",
//     "http://arxiv.org/pdf/2108.06709v1",
//     "http://arxiv.org/pdf/2106.14880v1",
//     "http://arxiv.org/pdf/2106.13381v1",
//     "http://arxiv.org/pdf/2106.13365v1",
//     "http://arxiv.org/pdf/2106.08417v3",
//     "http://arxiv.org/pdf/2105.07014v1",
//     "http://arxiv.org/pdf/2104.10133v1",
//     "http://arxiv.org/pdf/2104.09959v2",
//     "http://arxiv.org/pdf/2103.16054v1",
//     "http://arxiv.org/pdf/2103.05073v1",
//     "http://arxiv.org/pdf/2103.02093v1",
//     "http://arxiv.org/pdf/2103.01306v5",
//     "http://arxiv.org/pdf/2010.16404v2",
//     "http://arxiv.org/pdf/2010.06808v1",
//     "http://arxiv.org/pdf/2008.08294v2",
//     "http://arxiv.org/pdf/2008.07725v2",
//     "http://arxiv.org/pdf/2008.06120v1",
//     "http://arxiv.org/pdf/2005.09927v3",
//     "http://arxiv.org/pdf/2005.07289v2",
//     "http://arxiv.org/pdf/2005.04298v1",
//     "http://arxiv.org/pdf/2005.04259v1",
//     "http://arxiv.org/pdf/2005.04255v1",
//     "http://arxiv.org/pdf/2005.03844v2",
//     "http://arxiv.org/pdf/2005.01864v1",
//     "http://arxiv.org/pdf/2004.00831v2",
//     "http://arxiv.org/pdf/1912.04838v7",
//     "http://arxiv.org/pdf/1910.06528v2",
//     "http://arxiv.org/pdf/1910.05449v1",
//     "http://arxiv.org/pdf/1908.11069v3",
//     "http://arxiv.org/pdf/1812.03079v1"
// ]
console.log('Starting downloads...');

const papersDir = "/home/adnan/"
const supportBretDir = "/home/adnan/derp/support_bret/papers/"

const urls = await Bun.file(papersDir + "urls.txt").text()

//console.log(urls)
urls.split("\n").forEach(url => {
    url = url.replace('abs', 'pdf')
    downloadPaper(url)
})

import fs from "fs";

async function downloadPaper(url) {
   
    try {
        // Ensure URL ends with .pdf
        const pdfUrl = url.endsWith('.pdf') ? url : `${url}.pdf`;
        
        // Extract filename from URL
        const filename = pdfUrl.split('/').pop();
        
        // Create papers directory if it doesn't exist
        if (!fs.existsSync('./papers')) {
            fs.mkdirSync('./papers');
        }

        // Download the PDF
        const response = await fetch(pdfUrl);
        if (!response.ok) throw new Error(`Failed to download ${pdfUrl}`);
        
        // Write to file
        await Bun.write(`${supportBretDir}/${filename}`, response);
        console.log(`✓ Downloaded ${filename}`);
    } catch (error) {
        console.error(`✗ Error downloading ${url}:`, error.message);
    }
}

// Download all papers with a slight delay between each
async function downloadAllPapers() {
    for (const url of papers) {
        await downloadPaper(url);
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

//downloadAllPapers().then(() => console.log('Download process completed!'));