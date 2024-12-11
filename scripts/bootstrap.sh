# Index of Hardware
# 0. Jetson Orin
#   1. Zed 2i
#   2. trossen + lerobot
#   3.
#  add a new device + logging + error_handling to tailscale device list


setup_docker_lerbot () {
    sudo apt-get update
    # If you have any old versions of Docker installed (e.g. docker, docker.io, or docker-engine), remove them:
    sudo apt-get remove docker docker-engine docker.io containerd runc
    sudo apt-get install ca-certificates curl gnupg
    # Add Docker’s GPG Key:

    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    # Set Up the Stable Repository: Replace $(lsb_release -cs) with your Ubuntu codename (e.g. jammy, lunar) if it doesn't automatically resolve correctly. For 24.04, you may need to confirm the codename:

    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    #docker-ce: The Docker Engine
    #docker-ce-cli: The CLI for running Docker commands
#    #containerd.io: Container runtime
    ##docker-buildx-plugin and docker-compose-plugin: Tools for building and composing multi-container applications.

# 5. Manage Docker as a Non-Root User

# By default, Docker commands require sudo. If you want to run Docker as a regular user:

  #   Create the docker group if it doesn’t exist:

sudo groupadd docker

# Add your user to the docker group:

sudo usermod -aG docker $USER

# Activate the Changes:

    newgrp docker

# Now you can use Docker commands without sudo.
# 6. Test Your Installation

# Run the hello-world image to verify your Docker installation:

docker run hello-world

# If everything is set up correctly, you’ll see a confirmation message from the Docker daemon.
# 7. Docker Basics for a Frontend-to-DevOps Transition

# Since you’re coming from a frontend background and moving towards DevOps/Backend in a few months, here are some things to start exploring:

    # Learn Basic Docker Commands:
        # docker ps to list running containers.
        # docker images to list images.
        # docker run -it ubuntu bash to run an Ubuntu container interactively.
        # docker stop <container_id> and docker rm <container_id> to stop and remove containers.

    # Understand Dockerfiles:
    #     Learn how to write a Dockerfile for your applications.
    #     Understand instructions like FROM, RUN, COPY, EXPOSE, ENTRYPOINT, and CMD.

    # Building and Running Images:
    #     Use docker build -t myimage:latest . to build images.
    #     docker run -p 8080:80 myimage to run a container mapping host port 8080 to container port 80.

    # Docker Compose:
    #     Learn docker compose for multi-container applications (e.g. a frontend + backend + database stack).
    #     Create a docker-compose.yml to define services, networks, and volumes.

    # Best Practices:
    #     Use small, lightweight base images (e.g. alpine) for production.
    #     Understand image layers and caching.
    #     Keep your images secure by regularly updating and scanning them.

    # CI/CD and Infrastructure Integration:
    #     Explore integrating Docker into CI/CD pipelines.
    #     Look into container orchestration platforms like Kubernetes (K8s) once you’re comfortable with Docker.

# Documentation & Resources:

#     Official Docker Docs: https://docs.docker.com/
#     Dockerfile Best Practices: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/

# By following these steps and exploring these concepts, you’ll have a solid foundation in Docker. This will help you bridge the gap from frontend development to a more DevOps or backend-oriented role. Good luck!



    ##lerobot
    sudo ubuntu-drivers autoinstall
    # sudo reboot
    nvidia-smi
    # Example (adjust to latest version and commands provided by NVIDIA):
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/cuda-ubuntu2404.pin
sudo mv cuda-ubuntu2404.pin /etc/apt/preferences.d/cuda-repository-pin-600
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/7fa2af80.pub
sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/ /"
sudo apt update
sudo apt install -y cuda
# End Docker - begin lerobt

# Python Env Setup 

sudo apt install -y python3-pip python3-venv git build-essential

sudo apt install -y python3-pip python3-venv git build-essential

python3 -m venv lerobot-env
source lerobot-env/bin/activate
pip install --upgrade pip setuptools wheel


pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu117


pip install transformers huggingface_hub datasets
pip install safetensors

# 5. Install Huggig face transformers and depednences - sentence transnfers

pip install safetensors

# 6 cloning and setting up lerobot
git clone https://github.com/lerobot/lerobot.git
cd lerobot
pip install -r requirements.txt

pip install transformers huggingface_hub datasets
# Install LeRobot Requirements: Inside the lerobot directory, there should be a requirements.txt file or similar instructions in the README. Install them:

    pip install -r requirements.txt

    #If no requirements file is provided, ensure that you have transformers, huggingface_hub, pyyaml, requests, or any dependencies mentioned in their documentation.

# 7. Running LeRobot

#python lerobot.py

#python main.py

#import torch
#print(torch.cuda.is_available())

huggingface-cli login

    pip install --upgrade transformers

echo "setup_docker_lerbot compplete"


# Soruce https://chatgpt.com/c/6757be9f-fa6c-800a-9700-4588ef39e485
}




install_zed_2i () {
    echo "https://www.stereolabs.com/docs/gstreamer"
    sudo apt install build-essential
    sudo apt install cmake
    sudo apt install \
   libgstreamer1.0-0 \
   gstreamer1.0-libav \
   libgstrtspserver-1.0-0 \
   gstreamer1.0-tools \
   gstreamer1.0-x \
   gstreamer1.0-alsa \
   gstreamer1.0-gl \
   gstreamer1.0-gtk3 \
   gstreamer1.0-qt5 \
   gstreamer1.0-pulseaudio \
   libgstreamer1.0-dev \
   libgstrtspserver-1.0-dev \
   libgstreamer-plugins-base1.0-0 \
   libgstreamer-plugins-base1.0-dev \
   libgstreamer-plugins-good1.0-0 \
   libgstreamer-plugins-good1.0-dev \
   libgstreamer-plugins-bad1.0-0 \
   libgstreamer-plugins-bad1.0-dev
   sudo apt install libopencv-dev libopencv-contrib-dev


    #echo "installing zed2i"
}

install_nanosaur () {
    echo "installing nanosaur"
}


install_lerobot () {
    echo "installing zed2i"
}
# https://www.stereolabs.com/docs/gstreamer
#
#
before_install () {
    #sudo apt update

    fly secrets set LIVEKIT_API_KEY="APItSbwXvSjh4cf"
    fly secrets set LIVEKIT_API_SECRET="118jYtOPXJUYVeH7ZMSlQSoMKzPNve6sATZ149DfmfYC"
    fly secrets set LIVEKIT_HOST="wss://omnissiah-university-kmuz0plz.livekit.cloud"
    echo "---before install function complete---"
}


main_exec_bootsrap_script_from_install () {
    #before_install
    #install_zed_2i
    #install_lerobot
    #install_nanosaur
    setup_docker_lerbot
    echo "setup_docker_lerbot compplete"
}

main_exec_bootsrap_script_from_install



# op run --env-file <(op item get "LiveKit Credentials" --format=json | \
#   jq -r '.fields[] | select(.label=="LIVEKIT_API_KEY") | "LIVEKIT_API_KEY="+.value,
#           .fields[] | select(.label=="LIVEKIT_API_SECRET") | "LIVEKIT_API_SECRET="+.value') \
#   -- fly secrets set LIVEKIT_API_KEY=$LIVEKIT_API_KEY LIVEKIT_API_SECRET=$LIVEKIT_API_SECRET


# echo 'starting installation for dynabot - homelab'

# curl -sSL https://install.python-poetry.org | python3 -


# curl -fsSL https://deno.land/install.sh | sh

# sudo apt install curl

# sudo -s \
# curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
# gpg --dearmor --output /usr/share/keyrings/1password-archive-keyring.gpg
# echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/1password-archive-keyring.gpg] https://downloads.1password.com/linux/debian/$(dpkg --print-architecture) stable main" |
# tee /etc/apt/sources.list.d/1password.list
# mkdir -p /etc/debsig/policies/AC2D62742012EA22/
# curl -sS https://downloads.1password.com/linux/debian/debsig/1password.pol | \
# tee /etc/debsig/policies/AC2D62742012EA22/1password.pol
# mkdir -p /usr/share/debsig/keyrings/AC2D62742012EA22
# curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
# gpg --dearmor --output /usr/share/debsig/keyrings/AC2D62742012EA22/debsig.gpg
# apt update && apt install 1password-cli



# curl -fsSL https://tailscale.com/install.sh | sh

# sudo snap install xcaddy

# xcaddy build --with $(jq '.plugins[].name' caddy-plugins.json | paste -sd "," -)
