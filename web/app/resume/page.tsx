'use client'
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!resumeRef.current) return;
    const input = resumeRef.current;
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // Calculate image dimensions to fit A4
    const imgProps = pdf.getImageProperties(imgData);
    let pdfWidth = pageWidth;
    let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    // If content is taller than one page, add pages
    let position = 0;
    if (pdfHeight < pageHeight) {
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    } else {
      while (position < pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, -position, pdfWidth, pdfHeight);
        position += pageHeight;
        if (position < pdfHeight) pdf.addPage();
      }
    }
    pdf.save("resume.pdf");
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          aside,
          nav,
          footer,
          #nav {
            display: none !important;
            visibility: hidden !important;
          }
          
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          main {
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}} />
      <div className="max-w-3xl mx-auto px-4 pt-6 bg-white text-gray-800 font-sans print:bg-white">
        {/* <button
          onClick={handleExportPDF}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors float-right print:hidden"
        >
          Export as PDF
        </button> */}
        <div ref={resumeRef} className="clear-both pb-6">
          {/* Header / Name / Contact */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                Adnan Wahab
              </h1>
              {/* Optional: Add a short tagline or role summary */}
              {/* <p className="text-sm text-gray-600 mt-1">
                Perception Tools
              </p> */}
            </div>
            
            <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end text-sm text-gray-700 space-y-1">
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-600">Portfolio:</span>
                <a
                  href="https://adnanwahab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  adnanwahab.com
                </a>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-600">Email:</span>
                <a
                  href="mailto:adnan.f.wahab@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  adnan.f.wahab@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-600">Phone:</span>
                <span>713-677-3669</span>
              </div>
            </div>
          </header>

          {/* Professional Summary (Optional but recommended) */}
          {/* <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Summary</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Seasoned Software Engineer with expertise in large-scale data pipelines,
              computer vision, and 3D graphics. Passionate about building cutting-edge
              annotation tools, improving labeling throughput, and delivering robust
              user experiences at scale.
            </p>
          </section> */}

          {/* Professional Experience */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
              Professional Experience
            </h2>

            {/* Swarmbotics AI */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Software Engineer | Swarmbotics AI
                  </h3>
                  <p className="text-xs text-gray-500">Jan 2024 - Jul 2024</p>
                </div>
                <img
                  src="/logos/swarmbotics_ai_logo.jpeg"
                  alt="Swarmbotics AI logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>Implemented low-latency tele-operations for Military Contractor</li>
              </ul>
            </div>

            {/* Zoox */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Perception Tools Engineer | Zoox
                  </h3>
                  <p className="text-xs text-gray-500">Feb 2021 - Feb 2023</p>
                </div>
                <img
                  src="/logos/zoox.jpeg"
                  alt="Zoox logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>Lead development of 3D annotation tools for improving accuracy of perception models</li>
                <li>Developeed and maintained internal tools and systems automating existing work and improving productivity using LLMs</li>
                <li>Implemented Auto-labeling, RLHF, and continuous QA to lower cost of labels by over 80%</li>
                <li>
                  Awarded a patent for object annotation in computer
                  vision systems for autonomous vehicles
                </li>
              </ul>
            </div>

            {/* Principal Consulting */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Principal | Consulting
                  </h3>
                  <p className="text-xs text-gray-500">Feb 2019 - Feb 2021</p>
                </div>
              </div>
              <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
 
                <li>Built UIs and Tooling for Graphistry, MeetYogi(language modeling), and Blink Health</li>

              </ul>
            </div>

            {/* American Express */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Software Engineer | American Express
                  </h3>
                  <p className="text-xs text-gray-500">Feb 2017 - Feb 2019</p>
                </div>
                <img
                  src="/logos/amex.jpeg"
                  alt="American Express logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>Implemented A/B testing and analytics, increasing revenue by $400M/year</li>
                <li>Implemented design systems for consistent user experience across multiple regions.</li>
                <li>Created personalization layer for the "view-all-cards" page to increase conversions.</li>
              </ul>
            </div>

            {/* Samasource */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Graphics Engineer | Samasource
                  </h3>
                  <p className="text-xs text-gray-500">Mar 2015 - Oct 2017</p>
                </div>
                <img
                  src="/logos/samasource.jpeg"
                  alt="Samasource logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>Built LiDAR annotation tools for point clouds (WebGL, Three.js) for nascent AV industry</li>
                <li>Implemented large-scale labeling pipelines (Node.js, C++, Go)</li>
                <li>
                  Awarded first Innovation Award for Empowerment of Women by Secretary of State Hillary Clinton
                </li>
              </ul>
            </div>

            {/* Amaze */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Software Engineer | Amaze
                  </h3>
                  <p className="text-xs text-gray-500">Apr 2014 - May 2015</p>
                </div>
                <img
                  src="/logos/amaze.jpeg"
                  alt="Amaze logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
              <li>Made a webGL graphics engine, chrome extension, documentation and weekly demos for mobile web.</li>
              </ul>
            </div>

            {/* Sony */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Software Engineer | Sony PlayStation
                  </h3>
                  <p className="text-xs text-gray-500">Feb 2013 - Mar 2014</p>
                </div>
                <img
                  src="/logos/sony.jpeg"
                  alt="Sony logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>Contributed to PlayStation Now video game streaming services with ember.js and Java</li>
                <li>Built UI for PlayStation Store with over 100 million customers</li>
              </ul>
            </div>

            {/* BookFresh/Square */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Software Engineer | BookFresh
                  </h3>
                  <p className="text-xs text-gray-500">Feb 2012 - Feb 2013</p>
                  <p className="text-xs text-gray-400 italic">Acquired by Square</p>
                </div>
                <img
                  src="/logos/square.jpeg"
                  alt="Square logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>Created appointment-management applications to support 2M+ small business owners</li>
                <li>Supported BookFresh acquisition to expand Square's calendar services <a className="text-blue-600 hover:underline" href="https://archive.is/5WG2G" target="_blank" rel="noopener noreferrer">https://archive.is/5WG2G</a></li>
              </ul>
            </div>
          </section>

          {/* Education */}
          {/* <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
              Education
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-md font-semibold text-gray-800">
                Bachelor of Science in Computer Science
              </p>
              <p className="text-sm text-gray-500">Texas A&M University, 2013</p>
            </div>
          </section> */}

          {/* Technical Skills */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
              Technical Skills
            </h2>
            {/* If you have many skills, consider splitting them into columns */}
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <span className="font-semibold">Languages:</span>{" "}
                JavaScript, Python, Golang, C++, Zig
              </li>
              <li>
                <span className="font-semibold">Frontend:</span>{" "}
                React, Three.js, WebGL, tailwindcss
              </li>
              <li>
                <span className="font-semibold">Backend:</span>{" "}
                REST APIs, PostgreSQL, Docker, AWS, Clickhouse, Kinesis, Airflow
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}