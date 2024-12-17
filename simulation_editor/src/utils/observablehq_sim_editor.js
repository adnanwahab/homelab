const url_1 = `https://observablehq.com/embed/@roboticsuniversity/simulation-editor?cells=viewof+table&banner=false`
const url_2 = `https://observablehq.com/embed/@rreusser/dispersion-in-water-surface-waves?cells=canvas`


export default function observablehq_sim_editor() {


document.getElementById("toggle-button").addEventListener("click", () => {
    const iframe = document.getElementById("observablehq-iframe");
    iframe.src = iframe.src === url_1 ? url_2 : url_1;
});

document.getElementById("textarea").addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        console.log("about to send");

        const text = document.getElementById("textarea").value;
        const encodedText = encodeURIComponent(text);
        
        try {
            const response = await fetch(`https://gpu.jerboa-kokanue.ts.net?msg=${encodedText}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'text/plain'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.text();
            document.getElementById("response").innerHTML = data;
        } catch (error) {
            console.error('Error:', error);
            document.getElementById("response").innerHTML = "Sorry, there was an error processing your request.";
        }
    }
});
}