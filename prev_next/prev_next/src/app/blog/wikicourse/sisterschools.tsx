//hardware ops as easy as tailsclaee+tailwind
//cooking debugger
//dues ex ui
//figma for houses and pcb

import clsx from 'clsx';
//  function Example() {
//   const is_first = false//index === 0

//   // Add a new CSS class for the glow effect
//   const glowClass = "transition duration-300 ease-in-out transform hover:scale-105 hadow-lg shadow-blue-500";

//   const ym = schools.map((school, index) => {
//               return (<div className={"bg-white/5 p-8 sm:p-10 " + (is_first ? "col-span-3" : "")}>
//                 <a href={school.href}>
//                       <img
//                         alt={school.href.split('/').pop()}
//                         src={school.src}
//                         width={school.width}
//                         height={school.height}
//                         className={`w-full object-contain grayscale hover:grayscale-0 ${glowClass}`}
//                       />
//                 </a>
//       </div>)
//   })





//   return (
//     <div className="bg-gray-900 py-4 sm:py-6">
//             <div className="text-white text-2xl font-semibold mx-auto w-48">Sister Schools</div>

//       <div className="mx-auto max-w-7xl px-6 lg:px-8">

//         <div className="-mx-6 grid grid-cols-6 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl ">
//                   {ym}
//         </div>
//       </div>
//     </div>
//   )
// }



export default function Example() {
  const partnerships = []
  const width = 500
  const height = 500

  const sister_schools = [
    {
      "alt": "dynamicland",
        "width": 350,
        "height": 250,
        "src": "https://pbs.twimg.com/profile_images/907410769343426561/Zr3Z2_cD_400x400.jpg",
        "href": "https://dynamicland.org/2024/Intro/"
    },
    {
      "alt": "waymo",
        "width": 350,
        "height": 250,
        "src": "https://images.ctfassets.net/e6t5diu0txbw/7HWQUstHvM91gI7NIlwyWM/7a42ffbd56cf34f06a889cc62c5a13e5/trademarks-1.png?fm=webp",
        "href": "https://waymo.com"
    },
    {
      "alt": "Zoox",
        "width": 350,
        "height": 250,
        "src": "https://pbs.twimg.com/profile_images/1440739774491344901/WYP3m0A2_400x400.jpg",
        "href": "https://zoox.com"
    },
    {
      "alt": "ycombinator",
        "width": 350,
        "height": 250,
        "src": "https://pbs.twimg.com/profile_images/1623777064821358592/9CApQWXe_400x400.png",
        "href": "https://ycombinator.com"
    },
    {
      "alt": "ycombinator",
        "width": 350,
        "height": 250,
        "src": "https://threejs-journey.com/assets/images/illustration-webgl.webp",
        "href": "https://threejs-journey.com"
    },

    {
      "alt": "mit_scip",
        "width": 350,
        "height": 250,
        "src": "https://groups.csail.mit.edu/mac/classes/6.001/abelson-sussman-lectures/wizard.jpg",
        "href": "https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book.html"
    },
    {
      "alt": "botparty",
        "width": 350,
        "height": 250,
        "src": "https://avatars.githubusercontent.com/u/22305925?s=200&v=4",
        "href": "https://github.com/botparty/homelab_status_page"
    },
    // {
    //   "alt": "katonah_yoga",
    //     "width": 350,
    //     "height": 250,
    //     "src": "https://images.squarespace-cdn.com/content/v1/5f6b70df17d12911bcc65bb4/1dddf1c6-461a-4b9c-b233-2c659a4ba1cd/Screenshot+2024-10-27+at+14.52.40.jpg?format=2500w",
    //     "href": "https://katonahyoga.com"
    // },
    // ,
    // {
    //   "alt": "anthropic",
    //     "width": 350,
    //     "height": 250,
    //     "src": "https://pbs.twimg.com/profile_images/1810519453291200512/TCdiqN9B_400x400.jpg",
    //     "href": "https://eurekalabs.ai/"
    // },


    {
      "alt": "eurekalabs",
        "width": 350,
        "height": 250,
        "src": "https://pbs.twimg.com/profile_images/1810519453291200512/TCdiqN9B_400x400.jpg",
        "href": "https://eurekalabs.ai/"
    },
    {
      "alt": "openai",
        "width": 350,
        "height": 250,
        "src": "https://pbs.twimg.com/profile_images/1634058036934500352/b4F1eVpJ_400x400.jpg",
        "href": "https://openai.ai/"
    },

  ];
  return (
    <>
    {/* <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-white">Partnerships</h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            alt="Transistor"
            src={partnerships[0].src}
            width={partnerships[0].width}
            height={partnerships[0].height}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />  
          <img
            alt="Reform"
            src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-white.svg"
            width={partnerships[1].width}
            height={partnerships[1].height}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Tuple"
            src={partnerships[2].src}
            width={partnerships[2].width}
            height={partnerships[2].height}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />

        </div>
      </div>
    </div> */}
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-white">Parnternships</h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-5 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-5 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
         

         {sister_schools.map((school, index) => (
          <a href={school.href}>
<img
            alt={school.alt}
            src={school.src}
            width={500}
            height={500}
            className="col-span-2 col-start-2 w-full object-cover sm:col-start-auto lg:col-span-1"
          />
          </a>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
