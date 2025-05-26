import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: "Adnan Wahab's Blog",
  description: 'Read my blog about ML, culture and civilization.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Adnan Wahab's Blog
      </h1>
      <BlogPosts />
    </section>
  )
}
