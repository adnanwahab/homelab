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
        console.log("about to send")

        const text = document.getElementById("textarea").value;
        
        const encodedText = encodeURIComponent(text);
        const response = await fetch(`https://gpu.jerboa-kokanue.ts.net?msg=${encodedText}`, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        })

        const data = await response.text()
        console.log(data)
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Success:', data);
            //     document.getElementById("response").innerHTML = data.message.content;
            // })
            // .catch((error) => {
            //     console.error('Error:', error);
            // });
    }
});
}