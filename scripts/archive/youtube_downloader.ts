
const url = 'https://www.youtube.com/watch?v=CZim0p_etvM';


import play from 'play-dl';
import fs from 'fs';

const output = 'video.mp4';

(async () => {
  // Get the video stream
  const stream = await play.stream(url, { quality: 1080 });

  // Create a writable stream to save the video
  const fileStream = fs.createWriteStream(output);

  // Pipe the video stream to the file
  stream.stream.pipe(fileStream);

  stream.stream.on('end', () => {
    console.log('Download completed!');
  });
})();
