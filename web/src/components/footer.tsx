const navigation = {
  main: [
    { name: "Buy Robot", href: "/dynabot/robot" },
    { name: "Wiki-Course", href: "/dynabot/wikicourse" },
    { name: "LLama Tools", href: "/llama-tools" },
  ],
  contact: [
    { name: "hi@dynabot.dev", href: "mailto:hi@dynabot.dev" },
    { name: "Twitch.tv", href: "https://www.twitch.tv/dynabot_dev" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/adnan-wahab/" },
    { name: "Youtube", href: "https://www.youtube.com/@dynabot_dev" },
  ],
  legal: [
    { name: "DeepAtlas", href: "/legal" },
    { name: "EurekaLabs", href: "/terms" },
    { name: "Observablehq", href: "/terms" },
  ],
};

function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Logo + Copyright */}
          <div>
            {/* <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <p className="mt-4 text-sm text-gray-400">
              © 2024. All rights reserved.
            </p> */}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-gray-400 hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3">
              {navigation.contact.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-gray-400 hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white">Partnerships</h3>
            <ul className="mt-4 space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-gray-400 hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;



