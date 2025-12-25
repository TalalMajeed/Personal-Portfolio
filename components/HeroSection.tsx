export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen bg-white flex items-center justify-center px-6"
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Talal Majeed
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
          Senior Software Engineer
        </p>
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          AI & ML Engineer at Ecello specializing in full-stack development,
          cloud infrastructure, and machine learning applications.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-gray-300 hover:border-gray-900 text-gray-900 hover:text-gray-900 font-medium rounded-lg transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
