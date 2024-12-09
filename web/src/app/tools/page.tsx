export default function Tools() {
  const tools = [
    {
      title: "Analysis Tools",
      items: [
        { href: "/tools/replay_analyzer", label: "Replay Analyzer" },
        { href: "/tools/auto_debugger", label: "Auto Debugger" },
      ]
    },
    {
      title: "AI & Automation",
      items: [
        { href: "/tools/parallel_llm", label: "Parallel LLM" },
        { href: "/tools/flight_agent", label: "Flight Agent" },
        { href: "/tools/one_password_5_agents_1_password", label: "1Password + 5 Agents Integration" },
      ]
    },
    {
      title: "Testing & Development",
      items: [
        { href: "/tools/playwright_snapshot_test", label: "Playwright Snapshot Test" },
        { href: "/tools/mailwind", label: "Mailwind Resend" },
        { href: "/tools/", label: "" },

      ]
    },
    {
      title: "Hardware & Robotics",
      items: [
        { href: "/tools/dynamicland_arm", label: "Dynamicland Arm" },
        { href: "/tools/walk_to_yilo", label: "Walk to Yilo" },
      ]
    },

    {
      title: "Simulation Tools & Testing Continuous CI Deterministic",
      items: [
        { href: "/tools/medbot_simulation_testing", label: "Medbot Simulation Testing" },
        { href: "/tools/music_game", label: "Music Game" },
      ]
    },
    {
      title: "Integrations",
      items: [
        { href: "https://replit.com/@dynabot/dynabot-replit-integration", label: "Dynabot Replit Integration" },
      ]
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((section, i) => (
          <div key={i} className="space-y-4">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j}>
                  <a 
                    href={item.href}
                    className="text-blue-500 hover:text-blue-700 hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

          </div>
        ))}

        <div className="space-y-4"> 
          <h2 className="text-xl font-semibold">Magic Iframe - 4 Gpus</h2>
          
          <div className="grid grid-cols-2 gap-4 h-[600px]">

            <iframe src="https://gpu.jerboa-kokanue.ts.net/" className="w-full h-full border rounded-lg"></iframe>
          <iframe src="http://localhost:8000" className="w-full h-full border rounded-lg"></iframe>

            <iframe src="https://dynabot.dev/scripts" className="w-full h-full border rounded-lg"></iframe>
            <iframe src="https://dynabot.dev/music_game" className="w-full h-full border rounded-lg"></iframe>
            <iframe src="https://dynabot.dev/medbot_simulation_testing" className="w-full h-full border rounded-lg"></iframe>
          </div>

          <p>
            This is a magic iframe that allows you to run any website on the GPU.
            And it has uptime for 3 Gpus.
          </p>
        </div>
      </div>
    </div>
  );
}

// get ramen profitable in 3 weeks 
// day 0 = dec 9 