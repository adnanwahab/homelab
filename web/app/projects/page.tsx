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
          <a href="/projects/physics_puzzle_maker">Physics Puzzle Maker</a>
        </li>
        <li>
          <a href="/projects/comic_book_generator">Comic Book Generator</a>
        </li>
        <li>
          <a href="/projects/project6">Project 6</a> // TODO: add project 6
        </li>
        
      </ul>
    </div>
  );
}
