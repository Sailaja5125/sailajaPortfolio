import { NavLink } from "react-router-dom";

import  Logo  from "../assets/images/Logo.png"

const Navbar = () => {
    // Over 
  return (
    <header className='header'>
      <NavLink to='/'>
        <img src={Logo} alt='logo' className='w-10 h-10 object-contain rounded-lg' />
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/blog' className={({ isActive }) => isActive ? "text-blue-600" : "text-blue-950 hover:text-blue-600" }>
          Blogs
        </NavLink>
        <NavLink to='/portfolio' className={({ isActive }) => isActive ? "text-blue-600" : "text-blue-950 hover:text-blue-600"}>
          Portfolio
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
