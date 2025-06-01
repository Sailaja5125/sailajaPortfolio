import React from 'react'
import { Mail , PhoneCall} from 'lucide-react'
import { linkedin } from '../assets/icons'
import { github } from '../assets/icons'
function Contact() {
  return (
    <div>
         <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h3>
              <div className="flex items-center mb-4">
                <Mail className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-gray-600">email@example.com</span>
              </div>
                <div className="flex items-center mb-4">
                <PhoneCall className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-gray-600">+91 6302259493</span>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <a href="#" className="hover:border-2 hover:border-blue-950 text-white p-3 rounded-full transition">
                  <img src={github} alt="github" height={30} width={30}/>   
                </a>
                <a href="#" className=" hover:border-2 hover:border-blue-950 text-white p-3 rounded-full transition">
                 <img src={linkedin} alt="linkedin" />
                </a>
              </div>
            </div>
            
            <div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
