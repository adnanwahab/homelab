pages = [
    {
        "name": "Perception",
        "pages": [
            {"name": "Sensor Fusion", "path": "/sensor-fusion"},
            {"name": "LIDAR Processing", "path": "/lidar-processing"},
            {"name": "Camera Calibration", "path": "/camera-calibration"},
            {"name": "Object Detection", "path": "/object-detection"},
            {"name": "Semantic Segmentation", "path": "/semantic-segmentation"},
            {"name": "Voxels Stixels Minecraft", "path": "/voxels-stixels-minecraft"},
            {"name": "Scene Understanding", "path": "/scene-understanding"}
        ],
    },
    {
        "name": "Prediction",
        "pages": [
            {"name": "Behavioral Cloning", "path": "/behavioral-cloning"},
            {"name": "Markov Decision Processes", "path": "/markov-decision-processes"},
            {"name": "Path Prediction", "path": "/path-prediction"},
            {"name": "LSTM Networks", "path": "/lstm-networks"},
            {"name": "3D Mapping", "path": "/3d-mapping"},
            {"name": "Audio Processing", "path": "/audio-processing"},
            {"name": "Reinforcement Learning", "path": "/reinforcement-learning"},
            {"name": "Trajectory Optimization", "path": "/trajectory-optimization"},
            {"name": "Motion Planning", "path": "/motion-planning"},
            {"name": "Probabilistic Roadmaps", "path": "/probabilistic-roadmaps"}
        ],
    },
    {
        "name": "Simulation",
        "pages": [
            {"name": "Physics Engines", "path": "/physics-engines"},
            {"name": "Diffusion 3D Policy", "path": "/diffusion-3d-policy"},
            {"name": "Agent-Based Modeling", "path": "/agent-based-modeling"},
            {"name": "Sim-to-Real Transfer", "path": "/sim-to-real"},
            {"name": "Carla Rendering", "path": "/carla-rendering"}
        ],
    },
    {
        "name": "Real World Applications",
        "pages": [
            {"name": "Agricultural Robotics", "path": "/agricultural-robotics"},
            {"name": "Feeding Your Cat", "path": "/feeding-your-cat"},
            {"name": "Robot Bartender", "path": "/robot-bartender"},
            {"name": "Room Cleaning", "path": "/room-cleaning"},
            {"name": "Sentry", "path": "/sentry"}
        ],
    },
    {
        "name": "Hardware System",
        "pages": [
            {"name": "Actuators and Motors", "path": "/actuators-motors"},
            {"name": "Raspberry Pi & Jetson Nano", "path": "/raspberry-pi-jetson"},
            {"name": "Soldering and PCBs", "path": "/soldering-pcbs"},
            {"name": "Embedded Systems", "path": "/embedded-systems"},
            {"name": "Robot Kinematics", "path": "/robot-kinematics"},
            {"name": "ROS", "path": "/ros"}
        ],
    }
]

# Create markdown files for each path
for category in pages:
    for page in category['pages']:
        # Generate the filename by appending '.md' to the path, stripping the leading '/'
        filename = page['path'].lstrip('/') + '.md'
        # Use the 'touch' method to create the file
        open(filename, 'a').close()

print("Markdown files created successfully.")