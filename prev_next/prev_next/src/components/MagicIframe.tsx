function MagicIframe(props: {src: string}) {
  return <iframe 
  className="position-absolute top-0 right-0 border-1 border-green-500"
  src={props.src} width="500px" height="500px"></iframe>
}

export default MagicIframe;