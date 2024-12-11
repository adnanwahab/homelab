function lessons() {
    return new Response(
        `<iframe src="https://gpu.jerboa-kokanue.ts.net/real-world/roombacat" style="width:100%; height:100vh; border:none;"></iframe>`,
        {
            headers: { "Content-Type": "text/html" },
        },
    );
}

export default lessons;
