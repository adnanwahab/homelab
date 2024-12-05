import Link from 'next/link'
import Footer from '@/components/footer'
export default function ModeSelector() {
  return (
    <>
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-lg shadow-lg">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link
            href="/articles/dynamicland/comic"
            className="text-white font-semibold hover:text-yellow-300 transition duration-300"
          >
            Comic
          </Link>
        </li>
        <li>
          <Link
            href="/articles/dynamicland/blog"
            className="text-white font-semibold hover:text-yellow-300 transition duration-300"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/articles/dynamicland/youtube"
            className="text-white font-semibold hover:text-yellow-300 transition duration-300"
          >
            YouTube
          </Link>
        </li>
        <li>
          <Link
            href="/articles/dynamicland/game"
            className="text-white font-semibold hover:text-yellow-300 transition duration-300"
          >
            Game
          </Link>
        </li>
        <li>
          <Link
            href="/articles/dynamicland/jupyter"
            className="text-white font-semibold hover:text-yellow-300 transition duration-300"
          >
            Jupyter
          </Link>
        </li>
      </ul>
    </nav>
    <Footer />
    </>
  )
}
