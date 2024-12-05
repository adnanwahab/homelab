
const features = [
  // {
  //   name: '',
  //   description:
  //     'We put student interests first at their earliest stages regardless of their age',
  // },
  { name: '', description: 'We improve the success rate of our students in every project across life.' },
  {
    name: 'Gap Finding',
    description:
      'Each portfolio project contributes to your resume and portfolio for admissions, research or career opportunities.',
  },
  {name: '', description: 'capstone projects -> research grants or consulting projects for public companies.'},

  {name: 'Foundation Model', description: 'Benefit of $100 robot is that the valuable thing is the shared training data - so the more you use test robot the more you contribute to the community-owned foundation model'},

  {name: 'Robot Data Problem', description: 'Most difficult problem in robotics is the data problem - so we use the robot to collect data for your research project.'},
  { name: '', description: "Upon graduation, odyssey offers a profit-sharing incentive to students who have contributed to the project, 80% of revenue is allocated to paying students." },
  // { name: '', description: "Humans and robots living together in harmony and equality. That was my ultimate wish." },

  // llm.c  --- with logging data  + captions

]

// * <a className="text-blue-100" href="https://megaman.fandom.com/wiki/Doctor_Thomas_Light">

{/* <div className="text-blue-100">3 optimal outcomes</div>
<div className="text-blue-100">1. portfolio projects using lessons to get your dream job.</div>
<div className="text-blue-100">2. start a small robotics business and become an entrepreneur.</div>
<div className="text-blue-100">3. do independent research to get accepted to a PhD Program</div> */}
// https://x.com/worrydream/status/1156294253888208896<


const VennDiagram = () => {
  return (
    <svg width="800" height="600" viewBox="0 0 800 600" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Large circles for main fields */}
      <circle cx="300" cy="300" r="200" fill="#8f7aab" opacity="0.6" />
      <circle cx="500" cy="300" r="200" fill="#7fb7b2" opacity="0.6" />
      <circle cx="400" cy="200" r="200" fill="#b3c77e" opacity="0.6" />

      {/* Overlapping area text */}
      <text x="370" y="320" textAnchor="middle" fontSize="24" fill="#ffffff" fontWeight="bold">
        Authorship Learning
      </text>

      {/* Main categories */}
      <text x="150" y="120" textAnchor="middle" fontSize="18" fill="#ffffff">
        Student Ownership of Learning
      </text>
      <text x="650" y="120" textAnchor="middle" fontSize="18" fill="#ffffff">
        Collaborative Learning
      </text>
      <text x="400" y="60" textAnchor="middle" fontSize="18" fill="#ffffff">
        Project-based Learning
      </text>

      {/* Inner circles for specific theories */}
      <circle cx="250" cy="250" r="70" fill="#8f7aab" opacity="0.4" />
      <circle cx="550" cy="250" r="70" fill="#7fb7b2" opacity="0.4" />
      <circle cx="400" cy="130" r="70" fill="#b3c77e" opacity="0.4" />
      <circle cx="300" cy="330" r="50" fill="#8f7aab" opacity="0.4" />
      <circle cx="500" cy="330" r="50" fill="#7fb7b2" opacity="0.4" />
      <circle cx="400" cy="380" r="50" fill="#b3c77e" opacity="0.4" />

      {/* Labels for subfields */}
      <text x="250" y="255" textAnchor="middle" fontSize="12" fill="#ffffff">
        Cognitive Domains (Bloom)
      </text>
      <text x="550" y="255" textAnchor="middle" fontSize="12" fill="#ffffff">
        Connectionism (Thorndike)
      </text>
      <text x="400" y="135" textAnchor="middle" fontSize="12" fill="#ffffff">
        Learning by Doing (Dewey)
      </text>
      <text x="300" y="335" textAnchor="middle" fontSize="12" fill="#ffffff">
        Process Theory of Composition (Elbow)
      </text>
      <text x="500" y="335" textAnchor="middle" fontSize="12" fill="#ffffff">
        Cognitive Constructivism (Piaget, Bruner)
      </text>
      <text x="400" y="385" textAnchor="middle" fontSize="12" fill="#ffffff">
        Social Constructivism (Vygotsky)
      </text>

      {/* Additional labels */}
      <text x="180" y="370" textAnchor="middle" fontSize="12" fill="#ffffff">
        Metacognitive Theory (Flavell, Pressley)
      </text>
      <text x="620" y="370" textAnchor="middle" fontSize="12" fill="#ffffff">
        Observational Learning Theory (Bandura)
      </text>
      <text x="400" y="450" textAnchor="middle" fontSize="12" fill="#ffffff">
        Open Culture (Lessig, Stallman, Creative Commons)
      </text>
      <text x="400" y="175" textAnchor="middle" fontSize="12" fill="#ffffff">
        Problem-based Learning
      </text>
      <text x="460" y="230" textAnchor="middle" fontSize="12" fill="#ffffff">
        Experiential Learning (Rogers)
      </text>
      <text x="370" y="280" textAnchor="middle" fontSize="12" fill="#ffffff">
        Constructionism (Papert)
      </text>
    </svg>
  );
};

                {/* </a> */}
                // <a href="https://x.com/worrydream/status/1156294253888208896" key={feature.name}>

export default function Example() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2">
          <div>
            <div className="border-b border-gray-700 pb-10">
              {/* <h2 className="font-medium text-gray-100">Lifetime Support</h2> */}
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">We put Students interests first.</p>
            </div>

            <dl className=" space-y-2">
              {features.map((feature) => (
                  <div>
                    <dt className="text-sm font-medium text-gray-100 shiny-text">{feature.name}</dt>
                    <dd className="mt-3 text-md font-bold text-gray-100">{feature.description}</dd>
                  </div>
              ))}
              <div>
                {/* <div> citaitons </div> */}
                <a href="https://iliad.stanford.edu/robot-data-comp/#:~:text=Data%20collection%20has%20become%20an,data%20to%20facilitate%20broad%20generalization" className="text-blue-100">Stanford - robot data problem</a>
                <br></br>
                <a href="https://www.technologyreview.com/2024/04/30/1091907/the-robot-race-is-fueling-a-fight-for-training-data/" className="text-blue-100">MIT - robot-race-is-fueling-a-fight-for-training-data</a>
                {/* <a href="https://www.technologyreview.com/2024/04/30/1091920/the-download-robotics-data-bottleneck-and-our-ai-afterlives/" className="text-blue-100">Estimated value of Robotics Training Data is $30 Billion - If owned by 1 billion children - everyone gets paid $30 a month.</a> */}
              </div>
            </dl>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:mt-6 sm:gap-6 lg:mt-8 lg:gap-8">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-800">
                {/* <iframe src="https://worrydream.com/" width="100%" height="400px"></iframe> */}
              </div>
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-800">
                {/* <iframe src="https://dynamicland.org" width="100%" height="400px"></iframe> */}
              </div>
            </div>
          </div>

          <div>
            <div className="ml-4 aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-800 relative w-full]">
              <img
                alt="Black kettle with long pour spot and angled body on marble counter next to coffee mug and pour-over system."
                src="https://lh4.googleusercontent.com/bXjvqdd5SwFBM9bWE-DSZmxqdE8LRubisp78OQPo4bG92KQbQNk97OwR6KzypW4sxIjqCDfGAtWwT7Lug0x5iWFA4UPU40uePkYFUY7sTzC80aJy32JBvcWH"
                className={"h-full w-full object-cover object-center " + false ||  'absolute top-0 left-0'}
                // style={{ transform: 'scale(1.2)' }}
              />
                          {/* <VennDiagram /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// 80% of world can afford $450 for 1 robot per child - then they get paid to generate good data.