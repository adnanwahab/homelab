export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0D18] px-4">
      {/* Main container */}
      <div className="max-w-md text-center text-white">
        <h1 className="mb-4 text-3xl font-semibold md:text-4xl">
          Become a <span className="rainbow-text">Robotics Engineer</span>.
        </h1>
        <p className="mb-8 text-gray-300">
          We&apos;re building something special so you can learn how to connect
          to your creation, build with your hands with english language to
          explorable explanation generation.
          <br />
          <br />
          Join the waitlist.
        </p>

        {/* Form */}
        <form className="mb-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <input
            type="email"
            placeholder="messi@workon.co"
            className="w-full flex-1 rounded bg-[#191D2D] px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 sm:w-auto"
          />
          <button
            type="submit"
            className="rounded bg-green-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-green-600"
          >
            Join the waitlist
          </button>
        </form>

        {/* Sign in text */}
        <p className="text-gray-500">
          The hippest beta testers can{' '}
          <a href="#" className="text-green-400 hover:underline">
            sign in
          </a>{' '}
          to their account.
        </p>
      </div>
    </div>
  )
}
