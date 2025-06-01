import React from 'react';
import img from '../assets/images/me.jpg';

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          About Me
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>

        {/* Grid: 1 column on mobile → 2 on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={img}
              alt="Profile"
              className="w-40 h-40 md:w-full md:h-auto  rounded-lg shadow-md"
              height={20}
              width={20}
            />
          </div>

          {/* Text */}
          <div className="text-center md:text-left space-y-4">
            <p className="text-blue-950 text-2xl">
              I am a passionate software developer with expertise in multiple
              programming languages and frameworks. My journey in software
              development started with a curiosity to build solutions that solve
              real-world problems.
            </p>
            <p className="text-blue-950 text-2xl">
              I specialize in creating responsive web applications, efficient
              back-end systems, and intuitive user interfaces. My approach
              focuses on writing clean, maintainable code and implementing best
              practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
