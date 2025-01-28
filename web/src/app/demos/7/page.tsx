export default function () {
  return <>hi</>
}
// 'use client'
// import React, { useRef, useEffect } from 'react'
// import { Runtime, Inspector } from '@observablehq/runtime'
// //import notebook from '6be686728e80f6c6'
// import define from 'https://api.observablehq.com/d/6be686728e80f6c6@402.js?v=4'

// function Notebook() {
//   const ref = useRef()

//   useEffect(() => {
//     const runtime = new Runtime()
//     runtime.module(define, Inspector.into(ref.current))
//     return () => runtime.dispose()
//   }, [])

//   return (
//     <>
//       <div ref={ref} />
//       <p>
//         Credit:{' '}
//         <a href="https://observablehq.com/d/6be686728e80f6c6@402">
//           canvas - wind map by roboticsuniversity
//         </a>
//       </p>
//     </>
//   )
// }

// export default Notebook
