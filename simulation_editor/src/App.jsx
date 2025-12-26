// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom'
import Home from './screens/Home'
import About from './screens/About'
// import Contact from './screens/Contact'

// function Home() {
//   return <div>Home</div>
// }

// function About() {
//   return <div>About</div>
// }

// function Contact() {
//   return <div>Contact</div>
// }

import Settings from './settings'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App