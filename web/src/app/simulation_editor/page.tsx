export default function SimulationEditor() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
    }}>
      <iframe 
        src="https://simulation-tools.app" 
        width="100%" 
        height="100%" 
        style={{
          border: 'none',
        }}
      />
    </div>
  );
}
