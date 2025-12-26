import React from 'react';
import { useNavigate } from 'react-router-dom';

// Mock levels data - replace with your actual data source
const levels = [
    { id: '1', name: 'Level 1', difficulty: 'Easy', description: 'Introduction level' },
    { id: '2', name: 'Level 2', difficulty: 'Medium', description: 'Intermediate challenge' },
    { id: '3', name: 'Level 3', difficulty: 'Hard', description: 'Advanced gameplay' },
    { id: '4', name: 'Level 4', difficulty: 'Expert', description: 'Master level' },
    { id: '5', name: 'Level 5', difficulty: 'Easy', description: 'Another beginner level' },
];

export default function LevelList() {
    const navigate = useNavigate();

    const handleRowClick = (gameId) => {
        navigate(`/game/${gameId}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Levels</h1>
            <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                marginTop: '20px'
            }}>
                <thead>
                    <tr style={{ 
                        backgroundColor: '#f3f4f6',
                        borderBottom: '2px solid #e5e7eb'
                    }}>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left',
                            fontWeight: 'bold'
                        }}>ID</th>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left',
                            fontWeight: 'bold'
                        }}>Name</th>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left',
                            fontWeight: 'bold'
                        }}>Difficulty</th>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left',
                            fontWeight: 'bold'
                        }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {levels.map((level) => (
                        <tr
                            key={level.id}
                            onClick={() => handleRowClick(level.id)}
                            style={{
                                cursor: 'pointer',
                                borderBottom: '1px solid #e5e7eb',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f9fafb';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <td style={{ padding: '12px' }}>{level.id}</td>
                            <td style={{ padding: '12px' }}>{level.name}</td>
                            <td style={{ padding: '12px' }}>{level.difficulty}</td>
                            <td style={{ padding: '12px' }}>{level.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 