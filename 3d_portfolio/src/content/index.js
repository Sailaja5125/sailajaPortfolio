import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
    c,
    java,
    python,
    r,
    sql,
    postgres,
    spring,
    

} from "../assets/icons";

export const skills = [
    {
        imageUrl: c,
        name: "C",
        type: "Programming Language",
    },
    {
        imageUrl: java,
        name: "Java",
        type: "Programming Language",
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Programming Language",
    },
    {
        imageUrl: r,
        name: "R",
        type: "Programming Language",
    },
    {
        imageUrl: react,
        name: "React.js",
        type: "Frontend",
    },
    {
        imageUrl: spring, // ⚠️ Make sure you have an icon for Spring Boot in your assets
        name: "Spring Boot",
        type: "Backend",
    },
    {
        imageUrl: express,
        name: "Express.js",
        type: "Backend",
    },
    {
        imageUrl: sql,
        name: "SQL",
        type: "Database",
    },
    {
        imageUrl: postgres,
        name: "PostgreSQL",
        type: "Database",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },

];

 export const projects = [
    {
      title: 'AI-Agent - Communication Automation',
      description: 'An AI-driven system that auto-generates and sends emails in one click using Vercel SDK. Includes bulk messaging workflows with spreadsheet import and regex extraction, reducing manual effort by 80%.',
      technologies: ['Next.js', 'MongoDB', 'Express.js', 'Nodemailer', 'Vercel SDK'],
      link: 'https://github.com/Sailaja5125/Ai-agent.git'
    },
    {
      title: 'Recycling Marketplace Application',
      description: 'A Platfoorm connecting recyclers and waste generators. Features real-time inventory updates, secure transactions, and a user-friendly interface. Implemented a dynamic pricing algorithm based on market demand and material type.',
      technologies: ['React.js', 'Spring Boot', 'PostgreSQL', 'Cloudinary'],
      
      link: 'https://github.com/Sailaja5125/social-media.git'
    },
    {
      title: 'Social Media Application (cloned)',
      description: 'A cross-platform social media app with real-time posts and media uploads. Optimized Clerk authentication to reduce login time and integrated Cloudinary for fast, reliable media storage.',
      technologies: ['React Native', 'NativeWind', 'Express.js', 'MongoDB', 'Clerk', 'Cloudinary'],
      link: 'https://github.com/Sailaja5125/social-media.git'
    },
    {
      title: 'AI PDF Summarizer',
      description: 'A cross-platform application that uses AI to automatically summarize PDF documents, saving users time and effort.',
      technologies: ['Next.js', 'Redis', 'qdrant', 'Express.js', 'MongoDB', 'OpenAI API'],
      link: 'https://github.com/Sailaja5125/AiChatPDF.git'
    },


];

export const api = "http://localhost:5000/api/v1";
