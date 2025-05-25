// components/Iframe.js
const Iframe = ({ src, height = 400, ...props }) => (
    <iframe
      src={src}
      width="100%"
      height={height}
      frameBorder="0"
      {...props}
    />
  );
  
  export default Iframe;
  