


const url_1 = `https://observablehq.com/embed/@roboticsuniversity/simulation-editor?cells=viewof+table&banner=false`
const url_2 = `https://observablehq.com/embed/@rreusser/dispersion-in-water-surface-waves?cells=canvas`


export default function observablehq_sim_editor() {


document.getElementById("toggle-button").addEventListener("click", () => {
    const iframe = document.getElementById("observablehq-iframe");
    iframe.src = iframe.src === url_1 ? url_2 : url_1;
});

document.getElementById("textarea").addEventListener("input", () => {
    const text = document.getElementById("textarea").value;
    console.log(text);
});
}