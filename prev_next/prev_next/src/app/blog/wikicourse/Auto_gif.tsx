// import React, { useState } from 'react';
// import { createFFmpeg } from '@ffmpeg/ffmpeg';
// import { fetchFile } from '@ffmpeg/ffmpeg/dist/utils';

// const AutoGif: React.FC = () => {
//   // State to manage the GIF URL and loading status
//   const [gifUrl, setGifUrl] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   // Function to handle the conversion
//   const handleConvert = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setLoading(true);
//       const ffmpeg = createFFmpeg({ log: true });
//       await ffmpeg.load();

//       const videoFile = event.target.files[0];
//       ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));
//       await ffmpeg.run('-i', 'input.mp4', 'output.gif');
//       const data = ffmpeg.FS('readFile', 'output.gif');

//       const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
//       setGifUrl(url);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Convert MP4 to GIF</h1>
//       <input type="file" accept="video/mp4" onChange={handleConvert} />
//       {loading && <p>Converting...</p>}
//       {gifUrl && <img src={gifUrl} alt="Converted GIF" />}
//     </div>
//   );
// };

// export default AutoGif;

function _() {}

export default { _ };
