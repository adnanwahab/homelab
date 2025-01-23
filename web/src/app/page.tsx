
import PortfolioGrid from '../components/PortfolioGrid'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e2231]">
      <Header />
      {/* <PortfolioGrid /> */}
    </div>
  )
}


 function Header() {
  return (
    <div className="flex items-center justify-between border-b border-gray-700 bg-[#1e2231] p-8 text-[#8b98e8]">
      <div className="flex flex-col space-y-2">
        <h1 className="text-5xl font-bold tracking-tight text-[#8b98e8]">
          Adnan Wahab
        </h1>
        <h1 className="text-xl font-bold tracking-tight text-[#8b98e8]">
          Computer Graphics, Robotics, Infrastructure
        </h1>

        <div className="flex space-x-4 text-gray-400">


          <a href="/blog" className="hover:text-[#8b98e8]">
            blog
          </a>
          <a href="/tools" className="hover:text-[#8b98e8]">
            projects
          </a>
          

          <a
            href="mailto:adnan@llama-tools.com"
            className="hover:text-[#8b98e8]"
          >
            email
          </a> 
   <a
            href="https://github.com/adnanwahab"
            className="hover:text-[#8b98e8]"
          >
            github
          </a> 
    <a href="https://x.com/adnan_wahab_" className="hover:text-[#8b98e8]">
            twitter
          </a>
        <a
            href="https://linkedin.com/in/dynabot"
            className="hover:text-[#8b98e8]"
          >
            linkedin
          </a>
  </div>



          {/* <a href="/about" className="hover:text-[#8b98e8]">
            about
          </a> */}
        </div>
        <div className="text-sm text-gray-400">
          <a href="/simulation_game" className="underline hover:text-[#8b98e8]">
            Play interactive music physics game
          </a>
        </div>

        <div className="text-sm text-gray-400">
          <a
            href="/robotics-odyssey"
            className="underline hover:text-[#8b98e8]"
          >
            Self-teaching Robotics info-course
          </a>
        </div>
      </div>
  )
} 
