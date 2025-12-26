export default function SkillsSection() {
  const skillCategories = [
    {
      category: "Infrastructure & DevOps",
      skills: [
        "Cloud Infrastructure Setup",
        "DevOps",
        "Docker",
        "Kubernetes",
        "CI/CD Pipelines",
      ],
    },
    {
      category: "Web Development",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
      ],
    },
    {
      category: "Mobile Development",
      skills: ["React Native", "Flutter", "iOS", "Android"],
    },
    {
      category: "AI & Machine Learning",
      skills: [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "AI Integration",
        "LLMs",
      ],
    },
    {
      category: "Data & Analysis",
      skills: ["Data Analysis", "SQL", "MongoDB", "Data Visualization"],
    },
    {
      category: "Other Skills",
      skills: [
        "API Design",
        "Microservices",
        "Automation",
        "System Design",
        "Technical Writing",
      ],
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          My Skills
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-gray-700 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-lg">
            Open for Collaboration Requests and New Opportunities
          </p>
        </div>
      </div>
    </section>
  );
}
