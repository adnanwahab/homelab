export default function Page() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "1.5rem",
          listStyle: "none",
          padding: 0,
          margin: 0,
          width: "600px", // adjust as needed
        }}
      >
        <li>
          <a href="/projects/replay_analyzer">Replay Analyzer</a>
        </li>
        <li>
          <a href="/projects/karaoke">karaoke</a>
        </li>
        <li>
          <a href="/projects/voice_coach">voice coach</a>
        </li>
        <li>
          <a href="/projects/project4">Project 4</a>
        </li>
        <li>
          <a href="/projects/project5">Project 5</a>
        </li>
        <li>
          <a href="/projects/project6">Project 6</a>
        </li>
      </ul>
    </div>
  );
}
