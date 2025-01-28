import './twelve.module.css'
//import './twelve.module.css'
import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      {/* Label */}
      <label htmlFor="shadows" className="fixed top-[2vmin] left-[6vmin] text-white font-bold opacity-50 transition-opacity duration-300">
        Label
      </label>

      {/* Input Checkbox */}
      {/* <input
        type="checkbox"
        id="shadows"
        className="fixed top-[2vmin] left-[2vmin] opacity-50 transition-opacity duration-300"
      /> */}

      {/* Cubes Container */}
      <div className="cubes">
        {/* Example Cube */}
        <div className="cube" data-cube="111">
          <div className="cube-wrap delay-1">
            {/* Cube Faces */}
            <div className="cube-top"></div>
            <div className="cube-front-left"></div>
            <div className="cube-front-right"></div>
            <div className="cube-bottom"></div>
          </div>
        </div>

        {/* Repeat Cubes as Needed */}
        <div className="cube" data-cube="112">
          <div className="cube-wrap delay-2">
            <div className="cube-top"></div>
            <div className="cube-front-left"></div>
            <div className="cube-front-right"></div>
            <div className="cube-bottom"></div>
          </div>
        </div>

        {/* Add more cubes following the pattern */}
        {/* ... */}
      </div>

      {/* Large Shadows */}
      <div className="large-shadows">
        <div className="large-shadow"></div>
        {/* Repeat if necessary */}
      </div>
    </div>
  );
};

export default Page;
