const try_replicate = [    
    'https://replicate.com/cjwbw/rembg',
    'https://replicate.com/nightmareai/real-esrgan', // upscale


    'flux', 'segment',
    'YOLOv8',
'shilrley-grounding-dino',
'whisper',
'https://replicate.com/fofr/toolkit',
]

export default function Replicate() {
    return (
        <div>
            {try_replicate.map((tool, i) => (
                <div key={i} className="">
                    <a href={tool} className="text-blue-500 hover:text-blue-700 hover:underline">{tool}</a>
                </div>
            ))}
        </div>
    )
}
//https://replicate.com/explore
//https://replicate.com/collections/utilities