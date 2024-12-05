import React, { useState, useEffect } from "react";

function SharedModelOfReasoning() {
  return <div>

<img src="https://worrydream.com/MagicInk/p/communication_model.png" />

  </div>
}


function WorryDream() {
  //worrydream make hero of 4chan 

  const best_of = [
    'magic_ink',
    'communal_science',
    'seeing_space'
  ]
  return <div>WorryDream</div>
}


function Llama_prediction_notebook() {
  //https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/
  return <div>
    
    llama_prediction_notebook
    
    {/* <img src="https://scontent-hou1-1.xx.fbcdn.net/v/t39.2365-6/461179924_892945479558448_4846394290454647920_n.png?_nc_cat=105&ccb=1-7&_nc_sid=e280be&_nc_ohc=fK71uXhYBUsQ7kNvgFxeI-y&_nc_zt=14&_nc_ht=scontent-hou1-1.xx&_nc_gid=AHljAmoXxMObdl8mPd3iUpV&oh=00_AYDe0Y1wCtNHvPT4M1stFgFpyEVtc4LafOtQlmnpT1td2Q&oe=67595CD0" /> */}
    </div>
}




export default function Powerpoint() {
  const components = [
    <SharedModelOfReasoning />,
    <WorryDream />,
    <Llama_prediction_notebook />,
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + components.length) % components.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrev();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {components[currentIndex]}
      <button onClick={handlePrev}>Left</button>
      <button onClick={handleNext}>Right</button>
    </div>
  );
}

    // {/* <WorryDream /> */}
    // {/* <Llama_prediction_notebook /> */}
    // {/* <MirrorWall>
    //   <div><SharedModelOfReasoning /></div>
    //   <div><Llama_prediction_notebook /></div>
    //   <div><Llama_prediction_notebook /></div>
    //   <div><Llama_prediction_notebook /></div>
    //   <div><Llama_prediction_notebook /></div>
    //   <div><Llama_prediction_notebook /></div>
    //   <div><Llama_prediction_notebook /></div>
    //   <div>8</div>
//worry dream - no account 1 notebook - visualie mind magic 


// datomic
// 

{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/-80VsIdAHZw?si=9FCjxay_ers9uuYM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}


function MirrorWall({children}) {
  return (
    <div className="hafu">
      <div className="scene">
        <div className="mirror">{children[0]}</div>
        <div className="mirror">{children[1]}</div>
        <div className="mirror">{children[2]}</div>
        <div className="mirror">{children[3]}</div>
        <div className="mirror">{children[4]}</div>
        <div className="mirror">{children[5]}</div>
        <div className="mirror">{children[6]}</div>
        <div className="mirror">{children[7]}</div>
      </div>
      <style jsx>{`
        .hafu {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #222;
          perspective: 1000px;
        }

        .scene {
          width: 300px;
          height: 300px;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate 10s infinite linear;
        }

        .mirror {
          width: 100px;
          height: 150px;
          position: absolute;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.2));
          border: 2px solid rgba(255, 255, 255, 0.3);
          transform-origin: center;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        /* Positioning mirrors in a 3D grid */
        .mirror:nth-child(1) { transform: rotateY(0deg) translateZ(150px); }
        .mirror:nth-child(2) { transform: rotateY(45deg) translateZ(150px); }
        .mirror:nth-child(3) { transform: rotateY(90deg) translateZ(150px); }
        .mirror:nth-child(4) { transform: rotateY(135deg) translateZ(150px); }
        .mirror:nth-child(5) { transform: rotateY(180deg) translateZ(150px); }
        .mirror:nth-child(6) { transform: rotateY(225deg) translateZ(150px); }
        .mirror:nth-child(7) { transform: rotateY(270deg) translateZ(150px); }
        .mirror:nth-child(8) { transform: rotateY(315deg) translateZ(150px); }

        @keyframes rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}