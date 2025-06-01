import React from 'react'
import Sidebar from '../components/Sidebar'
import About from '../components/About'
import { Contact, Skills } from '../components'
import Project from '../components/Project'
// Over
function Portfolio() {
  return (
    <div className='w-full h-fit bg-white'>
        {/* pure section ka div hai */}
        <div className='relative top-16 w-full h-full p-5'> 
            <div className='fixed'>
            <Sidebar/>
            </div>
            <div className='ml-20 h-full'>
                <About/>
                <Skills/>
                <Project/>
                <Contact/>
            {/* 
            Contact section  */}
            </div>
        </div>

    </div>
  )
}

export default Portfolio
