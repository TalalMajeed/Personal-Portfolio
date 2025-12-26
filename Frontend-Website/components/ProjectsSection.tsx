export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "AI Document Analysis Platform",
      description:
        "End-to-end OCR and document analysis platform using machine learning for automated data extraction from various document types.",
      technologies: ["Python", "TensorFlow", "FastAPI", "React"],
      highlights: ["Document OCR", "ML Model", "REST API", "Web UI"],
    },
    {
      id: 2,
      title: "Cloud Infrastructure Automation",
      description:
        "Automated infrastructure setup and deployment pipeline using Infrastructure as Code principles for scalable cloud solutions.",
      technologies: ["Terraform", "AWS", "Docker", "CI/CD"],
      highlights: ["IaC", "Cloud Setup", "Automation", "DevOps"],
    },
    {
      id: 3,
      title: "Full-Stack Web Application",
      description:
        "Modern web application with real-time features, user authentication, and scalable backend architecture.",
      technologies: ["Next.js", "TypeScript", "MongoDB", "Node.js"],
      highlights: [
        "Real-time Features",
        "Auth System",
        "Database",
        "Responsive",
      ],
    },
  ];

  return (
    <section id="projects" className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          My Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors flex flex-col"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-40 flex items-center justify-center border-b border-gray-200">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-400 mb-2">
                    {String(project.id).padStart(2, "0")}
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors inline-flex items-center gap-2"
                >
                  Learn More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
