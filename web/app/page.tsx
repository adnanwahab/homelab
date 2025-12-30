import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
       Adnan Wahab 
      </h1>

      <a href="https://physics-game-five.vercel.app/" target="_blank" rel="noopener noreferrer">Physics Game</a>
<iframe src="https://physics-game-five.vercel.app/" width="100%" height="900px"></iframe>


      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
