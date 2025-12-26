export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contactLinks = [
    {
      label: "Email",
      href: "mailto:talal@ecello.net",
      value: "talal@ecello.net",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/talalmajeed/",
      value: "LinkedIn Profile",
    },
    {
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/muhammadtalalm",
      value: "Upwork Profile",
    },
    {
      label: "Website",
      href: "https://www.talalmajeed.com",
      value: "talalmajeed.com",
    },
  ];

  return (
    <footer id="contact" className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Talal Majeed
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Senior Software Engineer specializing in full-stack development,
              cloud infrastructure, and AI/ML integration.
            </p>
            <p className="text-gray-500 text-sm">
              Based in Islamabad, Pakistan
            </p>
          </div>

          {/* Right Section - Contact Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">
              Connect With Me
            </h4>
            <div className="space-y-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={
                    link.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="text-gray-500 text-sm">{link.label}</span>
                  <span className="block mt-0.5">{link.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© {currentYear} Talal Majeed. All rights reserved.</p>
            <p>Designed & Built with attention to detail</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
