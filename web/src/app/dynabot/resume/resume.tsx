// export default function () {
//   return <div>div</div>;
// }

const roles = [
  "solutions engineer",
  "embedded software engineer",
  "simulations engineer",
];

const role_content_map = {
  "simulations engineer": [],
};

const role_content = [
  "Led development of perception annotation and validation tools used by 200+ engineers",
  "Architected real-time 3D visualization platform for autonomous vehicle data analysis",
  "Maintained and scaled data pipelines processing 10TB+ daily for prediction, planning, simulation, and perception",
];

// Add company logo mapping
const companyLogos = {
  zoox: "https://pbs.twimg.com/profile_images/1440739774491344901/WYP3m0A2_400x400.jpg",
  samasource:
    "https://pbs.twimg.com/profile_images/1527470494995230720/G5aimkpO_400x400.jpg",
  sony: "https://pbs.twimg.com/profile_images/1836036128719130625/msPz79h2_400x400.jpg",
};

export default function Resume() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <div className="flex items-center space-x-4">
        
        {/* <img src="https://via.placeholder.com/64" alt="Profile Picture" className="w-16 h-16 rounded-full" /> */}
        <div>
          <h1 className="text-3xl font-bold">Adnan Wahab</h1>
          {/* <p className="text-gray-600">I help world-class product teams bridge UX Design, Devops and Scientific Computing.</p> */}
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <a
          href="https://www.linkedin.com/in/robotics-odyssey/"
          className="text-blue-500 hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/adnanwahab"
          className="text-blue-500 hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/roboticsodyssey"
          className="text-blue-500 hover:underline"
        >
          @roboticsodyssey
        </a>
      </div>

      <div className="mt-8 space-y-8">
        {/* Zoox Section */}
        <div className="flex items-start gap-4">
          <img
            src={companyLogos.zoox}
            alt="Zoox Logo"
            className="w-12 h-12 object-contain"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Zoox</h2>
              <span className="text-gray-500">2021-Present</span>
            </div>
            <p className="text-gray-700 font-medium">
              Perception Tools Engineer
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
              {role_content.map((content, i) => (
                <li key={i}>{content}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Samasource Section */}
        <div className="flex items-start gap-4">
          <img
            src={companyLogos.samasource}
            alt="Sama Logo"
            className="w-12 h-12 object-contain"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Samasource</h2>
              <span className="text-gray-500">2015-2017</span>
            </div>
            <p className="text-gray-700 font-medium">
              Built a 3D Annotation Tool for video, LiDAR, and sensor fusion,
              for computer vision and reinforcement learning.
            </p>
            <p className="text-gray-700 font-medium">
              Designed APIs for the nascent AV industry.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
              <li>
                MIT Solve award for social impact leaders with novel solutions
                to global issues
              </li>
              <li>
                Hillary Clinton's Secretary of State Innovation Award winner
              </li>
              <li>
                B Corp Best for the World Honoree (top 10% of all Nonprofits) -
                3 times (
                <a href="https://archive.is/PEgJA">https://archive.is/PEgJA</a>)
              </li>
              <li>
                Featured in Fast Company's Most Innovative Companies list - 3
                times (
                <a href="https://archive.is/f8G7k">https://archive.is/f8G7k</a>)
              </li>
            </ul>
          </div>
        </div>

        {/* Consulting Section */}
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-2">
            <img
              src={companyLogos.sony}
              alt="Meta Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Consulting</h2>
              <span className="text-gray-500">2012-2021</span>
            </div>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
              <li>Facebook Video, Blink Health, AMEX, Sony</li>
              <li>
                2015 Famo.us -
                https://youtu.be/imc1p_laIt4?si=2KKqGJCaYo-cnOUx&t=121
              </li>
              <li>2015 Capital One - http://archive.is/Qh3zh</li>
              <li>2014 Square - http://archive.is/5WG2G</li>
            </ul>
          </div>
        </div>

        {/* Achievements Section with improved content */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Notable Projects & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="https://dynabot.dev">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Dynabot.dev (2022)</h3>
                <p className="text-gray-600">
                  Interactive robotics education platform with 10 active users
                </p>
              </div>
            </a>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">SXSW Create (2015-2016)</h3>
              <p className="text-gray-600">
                Featured presenter: Botparty.org - Educational robotics platform
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">PathGL (2014)</h3>
              <p className="text-gray-600">
                Open-source WebGL visualization library with 500+ GitHub stars
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
