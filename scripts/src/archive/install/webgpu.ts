#!/bin/bash

# Check the operating system
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Installing Unity Hub on Linux..."
    
    # Add Unity Hub public signing key
    wget -qO - https://hub.unity3d.com/linux/keys/public | gpg --dearmor | sudo tee /usr/share/keyrings/Unity_Technologies_ApS.gpg > /dev/null
    
    # Add Unity Hub repository
    sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/Unity_Technologies_ApS.gpg] https://hub.unity3d.com/linux/repos/deb stable main" > /etc/apt/sources.list.d/unityhub.list'
    
    # Update package cache and install Unity Hub
    sudo apt update
    sudo apt-get install -y unityhub

elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Installing Unity Hub on macOS..."
    
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        echo "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # Install Unity Hub using Homebrew
    brew install --cask unity-hub

elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    echo "On Windows, please download Unity Hub from: https://unity.com/download"
    echo "After installation, continue with the next steps."
    exit 0
fi

echo "Unity Hub installation completed!"
echo ""
echo "Next steps:"
echo "1. Launch Unity Hub and sign in with your Unity ID"
echo "2. Go to 'Installs' in Unity Hub"
echo "3. Click 'Install Editor'"
echo "4. Select Unity 2022.3 LTS or later (required for WebGPU support)"
echo "5. In the components selection, ensure these are checked:"
echo "   - WebGL Build Support"
echo "   - Documentation"
echo ""
echo "To enable WebGPU in your Unity project:"
echo "1. Open your project in Unity"
echo "2. Go to Edit > Project Settings > Player"
echo "3. In WebGL settings, set 'WebGL Template' to 'WebGPU'"
echo "4. Enable 'Use WASM Threads' if you need multithreading support"
echo ""
echo "Note: WebGPU is supported in Chrome 113+ and other modern browsers"