import { useState } from 'react';
import {
  X,
  AlignJustify,
  House,
  CircleAlert,
  Wrench,
  FolderGit2,
  UserRound,
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { name: 'Home',     path: '/', icon: <House     color="#172554" /> },
    { name: 'About',    path: '#about', icon: <CircleAlert color="#172554" /> },
    { name: 'Skills',   path: '#skills', icon: <Wrench    color="#172554" /> },
    { name: 'Projects', path: '#projects', icon: <FolderGit2 color="#172554" /> },
    { name: 'Contact',  path: '#contact', icon: <UserRound color="#172554" /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      <div 
        className={`
          fixed
          min-h-fit
          text-blue-950
          bg-white
          transition-all duration-300 ease-in-out
          z-20
          rounded-lg
          flex flex-col items-center
          ${isOpen ? 'w-[10%]' : 'w-[5%]'}
        `}
      >
        {/* Mobile toggle: only show on sm screens */}
<button
  onClick={toggleMenu}
  className="fixed top-20 left-8 z-30 p-2 bg-blue-600 rounded-full md:hidden"
>
  {isOpen
    ? <X size={20} color="#fff" />
    : <AlignJustify size={20} color="#fff" />
  }
</button>

{/* Desktop toggle: hidden on mobile, flex on md+ */}
<div className={`hidden md:flex p-4 ${isOpen ? 'justify-end' : 'justify-start'}`}>
  <button
    onClick={toggleMenu}
    className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-300"
  >
    {isOpen
      ? <X size={20} color="#fff" />
      : <AlignJustify size={20} color="#fff" />
    }
  </button>
</div>


        {/* Menu Items */}
        <nav className="mt-8 w-full">
          {menuItems.map((item, idx) => (
            <a 
              key={idx}
              href={item.path}
              className={`
                flex items-center px-4 py-3 transition-all duration-300
                ${isOpen ? 'justify-start' : 'justify-center'}
                hover:underline
              `}
            >
              <div className={`${isOpen ? 'mr-3 w-8' : 'w-full text-center'}`}>
                {item.icon}
              </div>
              <span className={`
                transition-opacity duration-300
                ${isOpen ? 'opacity-100' : 'opacity-0 absolute'}
              `}>
                {item.name}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
