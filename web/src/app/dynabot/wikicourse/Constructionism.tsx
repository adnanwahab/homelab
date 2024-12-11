const TableOfContents = {
  
      "Perception": [
        ["Introduction to OpenCV", "https://opencv.org/"],
        ["Real-Time Object Detection with YOLO", "https://pjreddie.com/darknet/yolo/"],
        ["LiDAR in Robotics - A Complete Guide", "https://autonomoustuff.com/technology/lidar/"]
      ],
      "Prediction" : [
            ['Norvig Spelling Corrector', 'https://norvig.com/spell-correct.html'],
            ['Llama3.2', 'https://www.llama.com/'],

          //   ["Deep Learning for Robotics", "https://ai.googleblog.com/2020/01/deep-learning-for-robotics.html"],
          //   ["Reinforcement Learning for Robots", "https://spinningup.openai.com/en/latest/"]
          ],

      "Simulation": [
            ["Physics Simulation", "https://groups.csail.mit.edu/mac/users/gjs/6946/sicm-html/book.html"],
            // ["Gazebo for Robot Simulation", "http://gazebosim.org/"],
            ["Unity Robotics Hub", "https://github.com/Unity-Technologies/Unity-Robotics-Hub"]
          ],
          "Dynamicland.org": [
            ["SeeingSpace", "https://dynamicland.org/"],
            ["Communal science Lab", "https://dynamicland.org/2024/The_communal_science_lab.pdf"],
            ["magic ink", "https://worrydream.com/MagicInk/"],
            ['Non-Incremental Future', 'https://github.com/matthiasn/talk-transcripts/raw/master/Kay_Alan/NonIncrementalFuture/00.34.18.jpg'],


            ["", "https://dynamicland.org/"],
            ["A_Pattern_Language", "https://en.wikipedia.org/wiki/A_Pattern_Language"],
            ["Powerful ideas in the Classrom", "https://worrydream.com/Allen-Conn_2003_-_Powerful_Ideas_in_the_Classroom.pdf"],
            ['Augmentation', 'https://dougengelbart.org/content/view/201/'],
            ["Tools for Dynamicland", "https://www.rheingold.com/texts/tft/"],

            


            ["Nano_Technology", "https://bionano.ucsf.edu/"],
            ["https://miegakure.com/", "https://miegakure.com/"],
            ['Dynamic Media', 'https://joshuahhh.com/'],

          //   ["SeeingSpace", "https://dynamicland.org/"],
          //   ["SeeingSpace", "https://dynamicland.org/"],
          //   ["SeeingSpace", "https://dynamicland.org/"]
    
          ],
      "Computer Graphics & Visualization & UI": [
        ["Creating Robot Control Systems", "https://realpython.com/control-robots-python-ros/"],
        ["threejs", "https://threejs-journey.com/"],
        ["unreal enginee for Simulation", "https://www.unrealengine.com/en-US/unreal-engine-4"]
      ],
      "Ecosystem": [
            ["Real-World Robotics Use Cases by ROS", "https://www.ros.org/blog/"],
            ["Automation in Industry - Rethink Robotics", "https://rethinkrobotics.com/blog/"]
          ],
  
      "Connectivity": [
        ["ROS Networking in Robotics", "https://roboticsbackend.com/category/ros/ros-networking/"],
        ["tailscale", "https://tailscale.com/"],
        ["starlink", "https://www.starlink.com/"]
      ],

      // "Servos & Actuators & Kinematics": [
      //   ["Kinematics & Control for Robotics", "https://ocw.mit.edu/courses/mechanical-engineering/2-003sc-engineering-dynamics-fall-2011/"],
      //   ["Robotics: Science and Systems", "https://www.youtube.com/watch?v=X-iSQQgOd1A"],
      //   ["Robotics: Aerial Robotics", "https://www.youtube.com/watch?v=X-iSQQgOd1A"],
      //   ["Robotics: Mechanics and Control", "https://www.youtube.com/watch?v=X-iSQQgOd1A"],
      //   ["Robotics: Perception", "https://www.youtube.com/watch?v=X-iSQQgOd1A"],
      //   ["Robotics: Learning", "https://www.youtube.com/watch?v=X-iSQQgOd1A"],
      // ],
      // "GeoSpatial Planning": [
      //   ["MorphoCode Explorer", 'https://morphocode.com/explorer'],
      //   ["Path Planning with A* and D* Algorithms", "https://theory.stanford.edu/~amitp/GameProgramming/"],
      // ],
 
    };
import React from 'react';


const Constructionism = () => {
    return (
        <div className="mx-auto flex max-w-screen-xl flex-col">
                <div>Constructionism</div>  

{/* git visualizaer */}
  
            <div className="h-16"></div>
            
            <div className="gap-[25px] text-lg text-gray-700 dark:text-gray-400 md:columns-2 lg:w-full xl:columns-3">
                {Object.keys(TableOfContents).map((category) => (
                <div className="break-inside-avoid pb-[25px]">
                    <p className="mb-[12px] rounded bg-gray-200 py-[1px] text-center text-lg dark:bg-gray-800" style={{ fontVariant: 'all-petite-caps' }}>
                              {category}
                    </p>
                    {TableOfContents[category].map(([title, url]) => (
                    <p className="py-[4px] leading-tight">
                        <a href={url} className="text-pink-800 visited:text-pink-900 hover:underline dark:text-gray-400 dark:visited:text-gray-400">
                        {title}
                        </a>
                    </p>
                    ))}
                </div>
            ))}
            </div>
        </div>
    );
};

export default Constructionism;

// avante - to observable+zed


// get worry dream as many followers than elon musk - 50% works too - by 2025
//dynamciland = comptuer without solipsim.
//worry dream = void dragon - in a better galaxy - terran woruld work with void dragon.
//worrrydream will make everyone a 10,000x scientist arist engineer by 2025.