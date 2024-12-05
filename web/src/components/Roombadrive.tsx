'use client';

const onclick = () => {
  console.log('clicked');
}
const driveForward = async () => {
    try {
        const response = await fetch('/api/roomba-drive');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Handle the response as needed
        console.log('Roomba drive command sent successfully');
    } catch (error) {
        console.error('Error sending roomba drive command:', error);
    }
}

export default function Roomba( ) {
  return (
    <>
    <button

                // Start Generation Here
                
            className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"

    >
      Drive Forward
    </button>
    <button
            className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"

    >
 Turn Left
    </button>
    <img alt="" loading="lazy" decoding="async" data-nimg="fill" sizes="(min-width: 760px) 50vw, (min-width: 1000px) 33vw, 100vw" src="https://files.hashirama.blog/seeing/cropped_image_101.png" />
    </>
  )
}
