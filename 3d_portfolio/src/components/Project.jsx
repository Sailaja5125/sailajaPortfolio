import React, { useRef } from 'react';
import { projects } from '../content';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Project() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Featured Projects
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scrollable flex container with hidden scrollbar */}
          <div
            ref={sliderRef}
            className="
              flex space-x-6
              overflow-x-auto scroll-smooth
              py-2 px-4
              snap-x snap-mandatory
              scrollbar-hide
            "
          >
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="
                  flex-shrink-0 w-80 bg-gray-50
                  rounded-lg shadow-md overflow-hidden
                  hover:shadow-lg transition snap-start
                "
              >
                <img
                  src={`/api/placeholder/${300 + idx}/${200}`}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Project
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
