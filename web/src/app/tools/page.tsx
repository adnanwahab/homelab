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
      ]
    },
    {
      title: "Hardware & Robotics",
      items: [
        { href: "/tools/dynamicland_arm", label: "Dynamicland Arm" },
        { href: "/tools/walk_to_yilo", label: "Walk to Yilo" },
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
      </div>
    </div>
  );
}

