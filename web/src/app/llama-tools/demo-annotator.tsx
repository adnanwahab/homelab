import React from 'react';
let items = Array.from({ length: 20 }, (_, i) => i + 1);
const _ = '# only priority = course gen - 200 demos devops + robot + 200 demos'
export default function Demo_Annotator() {
  //const [items, setItems] = React.useState<number[]>(Array.from({ length: 9 }, (_, i) => i + 1));
  return (
    <div className="p-4">

      <div>"# only priority = course gen - 200 demos 
      devops + robot + 200 demos"</div>
            {/* <div>
                <textarea className="w-full h-full">
                    
                    most recent msg to chatbot
                    </textarea> 

            </div> */}
        {/* <h1>Demo Annotator</h1> */}
        <iframe src="http://observablehq.com/embed/@shelbernstein/demo-annotator" className="w-full h-full"></iframe>
      <div 
        className="grid grid-cols-3 gap-4 auto-rows-[200px] overflow-y-auto max-h-screen border-2 border-gray-300 rounded-lg"
      >
        {items.map((item, index) => (
          <div 
            key={item}
            className="bg-gray-200 rounded-lg flex items-center justify-center"
          >
             {item}
             <div>
              <a href={`/diagrams/${index}.js`}>{`/diagrams/${index}.js`}</a>
             <iframe src={`/diagrams/${index}.js`} className="w-full h-full"></iframe>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
