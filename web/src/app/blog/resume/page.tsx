export default function Resume() {
  const socialLinks = [
    { href: "https://www.linkedin.com/in/robotics-odyssey/", text: "LinkedIn" },
    { href: "https://github.com/adnanwahab", text: "GitHub" },
    { href: "https://twitter.com/roboticsodyssey", text: "Twitter" }
  ];

  const experiences = [
    {
      title: "Staff Perception Tools Engineer",
      company: "Zoox",
      period: "2021-Present",
      bullets: [
        "Architected and led development of enterprise-scale perception annotation and validation tools used by 200+ engineers",
        "Designed and implemented real-time 3D visualization platform for autonomous vehicle data analysis",
        "Built and maintained distributed data pipelines processing 10TB+ daily across prediction, planning, simulation, and perception systems",
        "Led technical direction for perception tooling infrastructure and validation frameworks"
      ]
    },
    {
      title: "Technical Lead",
      company: "Samasource",
      period: "2015-2017",
      bullets: [
        "Architected and developed comprehensive 3D annotation platform supporting video, LiDAR, and sensor fusion for autonomous vehicle perception",
        "Designed and implemented industry-standard APIs for autonomous vehicle data processing",
        "Led technical initiatives resulting in multiple awards:",
        [
          "MIT Solve Award for Technical Innovation",
          "U.S. Secretary of State Innovation Award",
          "B Corp Best for the World (Top 10% of Nonprofits) - 3x recipient",
          "Fast Company Most Innovative Companies - 3x honoree"
        ]
      ]
    },
    {
      title: "Senior Software Consultant",
      company: "",
      period: "2012-2021",
      bullets: [
        "Meta (Facebook): Led video infrastructure initiatives",
        "Capital One: Architected frontend systems for financial platforms",
        "Square: Developed payment processing systems",
        "Famo.us: Built high-performance UI frameworks",
        "Additional clients: American Express, Sony, Blink Health"
      ]
    }
  ];

  const projects = [
    {
      name: "Dynabot.dev",
      date: "2022",
      description: [
        "Built interactive robotics education platform serving active user base",
        "Implemented real-time simulation and control systems",
        "Developed comprehensive learning curriculum and interactive tutorials"
      ],
      link: "https://dynabot.dev"
    },
    {
      name: "PathGL",
      date: "2014",
      description: [
        "Created open-source WebGL visualization library",
        "Achieved 500+ GitHub stars",
        "Implemented high-performance graphics rendering pipeline"
      ]
    },
    {
      name: "BotParty.org",
      date: "2015-2016",
      description: [
        "Developed educational robotics platform featured at SXSW Create",
        "Built interactive demonstrations and workshops",
        "Created curriculum for robotics education"
      ]
    }
  ];

  const technicalExpertise = [
    { category: "Languages", items: ["JavaScript", "Python", "C++"] },
    { category: "Domains", items: ["Computer Vision", "Robotics", "3D Graphics"] },
    { category: "Infrastructure", items: ["Distributed Systems", "Data Pipelines", "Real-time Processing"] },
    { category: "Visualization", items: ["WebGL", "Three.js", "D3.js"] }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl p-8 my-8">
      {/* Header Section */}
      <div className="flex items-center space-x-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
            Adnan Wahab
          </h1>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex space-x-6 mt-4">
        {socialLinks.map(({ href, text }) => (
          <a
            key={text}
            href={href}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            {text}
          </a>
        ))}
      </div>

      {/* Professional Experience */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Professional Experience
        </h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {exp.title}{exp.company && ` | ${exp.company}`}
                  </h3>
                  <span className="text-gray-600 font-medium">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-2 mt-4 text-gray-700">
                  {exp.bullets.map((bullet, i) => {
                    if (Array.isArray(bullet)) {
                      // Nested bullets
                      return (
                        <li key={i}>
                          <ul className="list-disc list-inside space-y-1 mt-2 ml-6">
                            {bullet.map((subBullet, j) => (
                              <li key={j}>{subBullet}</li>
                            ))}
                          </ul>
                        </li>
                      );
                    } else {
                      return <li key={i}>{bullet}</li>;
                    }
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Projects */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Technical Projects
        </h2>
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {project.name} {project.date && `(${project.date})`}
                </h3>
                {project.link && (
                  <a href={project.link} className="text-blue-600 hover:underline">
                    {project.link}
                  </a>
                )}
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4 text-gray-700">
                {project.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Expertise */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technicalExpertise.map((expertise, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-gray-800">{expertise.category}</h3>
              <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
                {expertise.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
  