import { skills } from '../content';

export default function Skills() {
  return (
    <div id='skills'>
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        Skills
      </h2>
      <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>

      <div className="mt-16 flex flex-wrap gap-12 justify-center">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="relative group w-20 h-20"
          >
            {/* Tooltip */}
            <div
              className="
                absolute
                bottom-full
                mb-2
                left-1/2
                transform -translate-x-1/2
                px-2 py-1
                bg-gray-800 text-white text-xs
                rounded
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                pointer-events-none
              "
            >
              {skill.name}
            </div>

            {/* Icon container */}
            <div className="btn-front rounded-xl flex justify-center items-center w-full h-full bg-white shadow">
              <img
                src={skill.imageUrl}
                alt={skill.name}
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
