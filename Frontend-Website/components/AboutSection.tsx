export default function AboutSection() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Main Bio */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              I am a Senior Software Engineer with a passion for building
              scalable applications and integrating AI/ML solutions into
              real-world problems.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Current Role
                </h3>
                <p className="text-gray-800 mt-1">
                  AI & ML Engineer at{" "}
                  <a
                    href="https://ecello.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 underline"
                  >
                    Ecello
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Education
                </h3>
                <p className="text-gray-800 mt-1">
                  Computer Science Student at National University of Science &
                  Technology (NUST), Pakistan
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </h3>
                <p className="text-gray-800 mt-1">Islamabad, Pakistan</p>
              </div>
            </div>
          </div>

          {/* Experience & Interests */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Experience
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>3 Years of Professional Work Experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>1.5 Years of Freelancing at Upwork</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Research Interests
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    Applications of Machine Learning in Remote Sensing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Document Analysis and OCR using Machine Learning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
