import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";
// Over
const HomeInfo = ({ currentStage }) => {

  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center bg-blue-950 py-4 px-8 text-white mx-5 rounded-xl'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Sandy</span>
        👋
        <br />
        A Computer Science Engineering Student
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
        Writing to inspire, inform, and ignite curiosity.
        </p>

        <Link to='/blog' className='neo-brutalism-white neo-btn'>
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain text-blue-950' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Crafting digital experiences that captivate, innovate, and inspire
        </p>

        <Link to='/portfolio' className='neo-brutalism-white neo-btn'>
          Visit my portfolio
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain text-blue-950' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>
        Need a project done or looking for a dev? <br/> I'm just a few keystrokes away
      </p>

      <Link to='/contact' className='neo-brutalism-white neo-btn'>
        Let's talk
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </Link>
    </div>
    );
  }

  return null;
};

export default HomeInfo;
