import ModeSelector from '../ModeSelector'




function YoutubeEmbed({src}: {src: string}) {
    console.log(src)
        return <iframe width="560" height="315" src={src} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen></iframe>
}


export default function Youtube() {
    const src = [
        "https://www.youtube.com/embed/_gXiVOmaVSo?si=JzGWW5u97B0pzNFO",
        "https://www.youtube.com/embed/gTAghAJcO1o?si=iY74F1NDQjCea0I9",
        "https://youtube.com/embed/Ud8WRAdihPg?si=LaCfaSN9nSA8bBn-",
       "https://www.youtube.com/embed/fhOHn9TClXY?si=_Z8bk5d5YSTDFfR2",
       "https://www.youtube.com/embed/klTjiXjqHrQ?si=rQJRj1IYhT3LZJiv",
      "https://www.youtube.com/embed/fThhbt23SGM?si=H92qeQ2FLYs6tWmD"
    ]


    
  return <>
  <div>Youtube</div>
  {/* <ModeSelector /> */}
  {src.map((s) => <YoutubeEmbed src={s} />)}
  <ModeSelector />
  </>
}
