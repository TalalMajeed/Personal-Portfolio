import Link from "next/link";

export default function ContactBanner() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Let's Work Together
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          I'm always interested in hearing about new projects and opportunities.
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
