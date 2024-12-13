const url_1 = `https://observablehq.com/embed/@roboticsuniversity/simulation-editor?cells=viewof+table&banner=false`
const url_2 = `https://observablehq.com/embed/@rreusser/dispersion-in-water-surface-waves?cells=canvas`


export default function observablehq_sim_editor() {


document.getElementById("toggle-button").addEventListener("click", () => {
    const iframe = document.getElementById("observablehq-iframe");
    iframe.src = iframe.src === url_1 ? url_2 : url_1;
});

document.getElementById("textarea").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents adding a new line
        const text = document.getElementById("textarea").value;
        
        fetch('https://gpu.jerboa-kokanue.ts.net', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: text })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
}