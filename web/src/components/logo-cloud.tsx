import { clsx } from 'clsx'





export function LogoCloud({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  const partnerships = [
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
    <div
      className={clsx(
        className,
        'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
      )}
    >
          <a href={partnerships[0].href}>
            <img
              alt="SavvyCal"
              src={partnerships[0].src}
              className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
            />
          </a>
          <a href={partnerships[1].href}>
            <img
              alt="Laravel"
              src={partnerships[1].src}
              className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
            />
          </a>
          <a href={partnerships[2].href}>
            <img
              alt="Tuple"
              src={partnerships[2].src}
              className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
            />
          </a>
          <a href={partnerships[3].href}>
            <img
              alt="Transistor"
              src={partnerships[3].src}
              className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
            />
          </a>
          <a href={partnerships[4].href}>
            <img
              alt="Statamic"
              src={partnerships[4].src}
              className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
            />
          </a>
        </div>
      )
    }
