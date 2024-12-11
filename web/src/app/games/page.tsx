'use client'
const Games = [
    {
        "name": "Music Game",
        "imgsrc": "https://media4.giphy.com/media/3otPoo8NDLOmzvTJF6/giphy.gif?cid=6c09b9524cu16ebo4tsyoifh0dxzoiho2unj1os0ytb9wxf1&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        "description": "Create and play with interactive music visualizations",
        "type": "music_game",
        "link": "/games/music_game"
    },
    {
        "name": "Physics Playground",
        "imgsrc": "https://picsum.photos/200/300",
        "description": "Experiment with physics-based interactions and puzzles",
        "type": "physics_game",
        "link": "/games/physics_game"
    },
    {
        "name": "Puzzle Challenge",
        "imgsrc": "https://picsum.photos/200/300",
        "description": "Solve mind-bending puzzles and challenges",
        "type": "puzzle_game",
        "link": "/games/puzzle_game"
    },
    {
        "name": "Dwarf Game",
        "imgsrc": "https://picsum.photos/200/300",
        "description": "A dwarf fortress inspired simulation game",
        "type": "simulation_game",
        "link": "/games/dwarf_game"
    }
]


import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
//import App from './edit/page'

import ScaleParticles from './ScaleParticles'

import ThreeGamepadScene from './ThreeGamepadScene'
import dynamic from 'next/dynamic';
import Link from 'next/link'
// const MusicPage = dynamic(() => import('./Music_Physics'), { ssr: false });

//const MusicPhysics = dynamic(() => import('js/JoltPhysics'), { ssr: false });

//import LevelsGrid from './183_levels/page';
//as of 2 years ago - may need tools to manage 10x more code generation - easy to write, hard to read
//3-4 column steps editor

///we want 3 to 15 possibiles - scenario- rendered 

function LevelsGrid() {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
                width: '100%'
            }}>
                {games.map((item, index) => (
                    <div key={index} style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <Link href={item.link}>
                        <div style={{ 
                            height: '150px', 
                            backgroundColor: '#f5f5f5',
                            position: 'relative'
                        }}>
                            <img 
                                src={item.imgsrc}
                                alt={item.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div style={{ padding: '15px' }}>
                            <h3 className="text-blue-500" style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
                            <p style={{ margin: '0', color: '#666' }}>
                                {item.type}
                            </p>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
//                     className={styles.rotating_iframe}
// className={styles.iframe_container}

export default function MusicGame() {
    return (
        <div>
            <h1>See all 150 games -- iterated on simultaenously</h1>
            <LevelsGrid />
            <div >
                <iframe 
                    src="https://www.littleworkshop.fr/projects/5milliondevs/" 
                />
            </div>
            <iframe src="/games/edit" width="100%" height="1000px"></iframe>
        </div>
    );
}


function Drawing_widget() {
    return (
        <div>
            <h1>Drawing Widget</h1>
            <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <div style={{ width: '50%', height: '100%' }}>
                Hello World
            </div>
            <div style={{ width: '50%', height: '100%' }}>
                <Tldraw />
            </div>
        </div>
        </div>
    );
}
///observable is organizing worl's information.
//artist commune pokemon go in an elevator with music