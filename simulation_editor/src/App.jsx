// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom'
import Game from './screens/Game'
import LevelList from './screens/LevelList'
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

import Settings from './screens/Settings'

function App() {
  return (
    <div>
      <nav>
        {/* <Link to="/">Home</Link> */}
        <Link to="/game">Game</Link>
        <br />
        <Link to="/level-list">Level List</Link>
        {/* <Link to="/settings">Settings</Link> */}
      </nav>

      <Routes>
        <Route path="/" element={<LevelList />} />
        <Route path="/level-list" element={<LevelList />} />
        <Route path="/game/:game_id" element={<Game />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App