//YouTube downlaoder
//twitter downlaoder
//ffmpeg video to ?
//frames to threjs
// viewer and organize the

//enron diagram oas 3d adventure
//100 emails
//100 images
//100 panoramas
//100 games

//tone = happy
const captions = [
  ///"I miss you, and i'm sorry for letting you down before the pandemic",
];

//https://arxiv.org/pdf/2407.21285
//https://en.wikipedia.org/wiki/File:Escher%27s_Relativity.jpg

const toDownload = [
  "https://www.youtube.com/watch?v=vaYEKyVIf8I",
  "https://jsfiddle.net/designsystemweb/u70Ljshk/",
  "http://www.timjchin.com/images/onetomany/thumb.gif",
  "https://jsfiddle.net/designsystemweb/n1Lhjbkw/",
  "https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fctdjqh2vdt4e1.gif%3Fwidth%3D1920%26format%3Dmp4%26s%3D85edd4bc7fc037815141d8143dc6d0fc7fd02436",
  "https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2F4i2pdduiaf6e1.gif%3Fwidth%3D302%26format%3Dmp4%26s%3D84751e80c2d81bcffaa60ad698775f477bf86b31",
];

const seven_hundred_images = {

  "https://dynabot.dev/screenshot_per_day.png": "screenshot_per_day.png",
  "https://dynabot.dev/Infinite.gif": "Infinite.gif",
};
// ladder of abstraction
// https://mail.google.com/mail/u/0/#inbox log resolution 2
// http://localhost:8080/api/resend log resolution 1
export default function Map({ firstName }: { firstName: string }) {
  return (
    <div aria-hidden="true" className="relative size-full">
      <div className="absolute inset-0 bg-[url(/map.png)] bg-[length:530px_430px] bg-[center_-75px] bg-no-repeat [mask-image:linear-gradient(to_bottom,black_50%,transparent)]" />

      <h1>hi {firstName}</h1>

      <h1>{toDownload.map((url) => <a href={url}>{url}</a>)}</h1>
      {Object.entries(seven_hundred_images).map(([image, name]) => (
        <>
          <img src={image} alt={name} />
          <h3>{name}</h3>
          <h6>{name}</h6>
          <h6>Mystery Novel: part 1 of 7: estimated 2 min scroll total</h6>
        </>
      ))}
    </div>
  );
}
