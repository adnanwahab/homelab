import Link from "next/link";

export default function Page() {
  return (
    <div style={{ backgroundColor: "red" }}>
      <h1>playwright</h1>
      <iframe src="http://localhost:3000/home/about" />
    </div>
  );
}
