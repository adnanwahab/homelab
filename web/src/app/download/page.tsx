import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-6xl">
            Learn-math.app / hashirama.com
          </h2>
          <div className="mx-auto mt-6 max-w-2xl text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            <p>7 games to learn</p>
            <ul>
              <li>1. paper mario / (jolt 3js physics webgpu css3)</li>
              <li>2. notion / observablhq (markdown to diagram)</li>
              <li>3. diagram to collaboratively align maurice(innate.bot)</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-base/7 font-semibold text-indigo-400">
              Deploy faster
            </h2>
            <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Everything you need to deploy your app
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
              <div className="flex p-px lg:col-span-4">
                <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]">
                  <div className="relative h-80 w-full">
                    <Image
                      src="/api/placeholder/800/320"
                      alt="Releases"
                      fill
                      className="object-cover object-left"
                    />
                  </div>
                  <div className="p-10">
                    <h3 className="text-sm/4 font-semibold text-gray-400">
                      Releases
                    </h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-white">
                      Push to deploy
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In gravida justo et nulla efficitur.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex p-px lg:col-span-2">
                <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
                  <div className="relative h-80 w-full">
                    <Image
                      src="/api/placeholder/400/320"
                      alt="Integrations"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-10">
                    <h3 className="text-sm/4 font-semibold text-gray-400">
                      Integrations
                    </h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-white">
                      Connect your favorite tools
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                      Curabitur auctor, ex quis auctor venenatis, eros arcu
                      rhoncus massa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex p-px lg:col-span-2">
                <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-bl-[2rem]">
                  <div className="relative h-80 w-full">
                    <Image
                      src="/api/placeholder/400/320"
                      alt="Security"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-10">
                    <h3 className="text-sm/4 font-semibold text-gray-400">
                      Security
                    </h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-white">
                      Advanced access control
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                      ultrices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex p-px lg:col-span-4">
                <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]">
                  <div className="relative h-80 w-full">
                    <Image
                      src="/api/placeholder/800/320"
                      alt="Performance"
                      fill
                      className="object-cover object-left"
                    />
                  </div>
                  <div className="p-10">
                    <h3 className="text-sm/4 font-semibold text-gray-400">
                      Performance
                    </h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-white">
                      Lightning-fast builds
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                      Sed congue eros non finibus molestie. Vestibulum euismod
                      augue vel commodo vulputate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-3xl font-semibold tracking-tight text-gray-900">
              Lifetime membership
            </h3>
            <p className="mt-6 text-base/7 text-gray-600">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
              amet indis perferendis.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm/6 font-semibold text-indigo-600">
                What&apos;s included
              </h4>
              <div className="h-px flex-auto bg-gray-100"></div>
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {[
                "Private forum access",
                "Member resources",
                "Entry to annual conference",
                "Official member t-shirt",
              ].map((item) => (
                <li key={item} className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Pay once, own it forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-semibold tracking-tight text-gray-900">
                    $1.00
                  </span>
                  <span className="text-sm/6 font-semibold tracking-wide text-gray-600">
                    USD
                  </span>
                </p>
                <Link
                  href="#"
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get access
                </Link>
                <p className="mt-6 text-xs/5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
