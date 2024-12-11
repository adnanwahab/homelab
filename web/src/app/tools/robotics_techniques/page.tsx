

const all_lessons_hope_30 = [
    'segment_anything',
    'habitat',
    'llama3.2',
    'drawing'
]

const jetson_containers = [
    'segment_anything',
    'lerbot',
    'zed',

    //Not sure 
    'whisper',
    'nerfstudio',
    'gsplatting',
]
//https://github.com/dusty-nv/jetson-containers

//jupyterlab

//llama3.2
//llaava



//zed
//lerbot


export default function Robotics_techniques() {
    return (
        <div>
            <h1>Robotics techniques</h1>
            <h2>Jetson containers</h2>
            {jetson_containers.map((container, i) => (
                <div key={i} className="">{container}</div>
            ))}
 
        </div>
    )
}