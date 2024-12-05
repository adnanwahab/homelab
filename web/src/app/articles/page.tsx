



// import Dynamicland from './dynamicland/page.mdx'

// function DynamiclandPage() {
//   return <Dynamicland />
// }


// const posts = {
//   "favorites": [
//     "visualzing zoox and waymo 5000 research papers in practice",
//     "1001 Request for Robotics Startup"
//   ],
//   "robotic_perception": [
//     "Whisper",
//     "Vision transformers for captioning Environmental cameras to capture action logs",
//     "3D Annotation for Robotics - 3x",
//     "Designing a 3D Captcha"
//   ],
//   "robotic_prediction": [
//     "LLama 3.2 theory and practice"
//   ],
//   "robotic_simulation": [
//     "Eterna",
//     "Deterministic CI pipelines for testing robotics"
//   ],
//   "robotic_graphics": [
//     "NERF",
//     "gaussian splatting",
//     "point cloud rendering",
//     "voxels and stixels",
//     "server side webgpu streaming",
//     "ray tracing (2d and 3d) - visibility"
//   ],
//   "robotics_systems": [
//     "I love zig",
//     "Tailscale & starlink for Robotic Connectivity in outdoor environments.",
//     "Robotic Locomotion for outdoor environments"
//   ]
// }


// import { type Metadata } from 'next'
// import { Card } from '@/components/Card'

// import Footer from '@/components/footer'

// import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
// import { formatDate } from '@/lib/formatDate'


// function Article({ article }: { article: ArticleWithSlug }) {
//   return (
//     <article className="md:grid md:grid-cols-4 md:items-baseline">
//       <Card className="md:col-span-3">
//         <Card.Title href={`/articles/${article.slug}`}>
//           {article.title}
//         </Card.Title>
//         <Card.Description>{article.description}</Card.Description>
//         <Card.Cta>Read article</Card.Cta>
//       </Card>
//       <Card.Eyebrow
//         as="time"
//         dateTime={article.date}
//         className="mt-1 hidden md:block"
//       >
//         {formatDate(article.date)}
//       </Card.Eyebrow>
//     </article>
//   )
// }

// export const metadata: Metadata = {
//   title: 'Articles',
//   description:
//     'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
// }

// export default async function ArticlesIndex() {
//   let articles = await getAllArticles()

//   return (

//       <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
//       {/* <iframe src="/articles/dynamicland" title="YouTube video player" className="w-full h-full" style={{'width': '1080px', 'height': '1080px'}} /> */}

//         <div className="flex max-w-3xl flex-col space-y-16">
//           <h1>hi </h1>
//           <Dynamicland />


//           {/* {articles.map((article) => (
//             <Article key={article.slug} article={article} />
//           ))} */}

//         </div>
//         <Footer/>
//       </div>

//   )
// }
