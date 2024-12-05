import { marked } from 'marked';
import readme from './readme.md';

const md = marked.parse(readme);

export default function Support_Bret() {
  return  <div>
    <h1>Support Bret Victor</h1>
    <p>Bret Victor is a pioneer in the field of human-computer interaction and interface design. He is best known for his work on Dynamicland, a project that aimed to create a new kind of computer interface that would allow users to interact with computers in a more natural and intuitive way. Victor's ideas have been influential in the development of new technologies and have inspired many people to think about the future of computing.</p>
    <div>
      <img class="w-1/2" src="/public/osmosis-jones.png" alt="Bret Victor" />
        {/* <iframe src="https://dynamicland.org/2024/The_communal_science_lab.pdf" title="The Communal Science Lab" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
        {/* <iframe src="https://www.youtube.com/embed/hYvOSDt6LmY?si=8585858585858585" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
    </div>
  </div> 
}