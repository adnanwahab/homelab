'use client'
import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'

export default function MusicGame() {
    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <div style={{ width: '50%', height: '100%' }}>
                Hello World
            </div>
            <div style={{ width: '50%', height: '100%' }}>
                <Tldraw />
            </div>
        </div>
    );
}

///observable is organizing worl's information.
//artist commune pokemon go in an elevator with music