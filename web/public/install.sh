#!/bin/bash


#list of deps
#1. rustdesk
#2. bun 
#   playwright
#   
#   livekit
#   cursor, zed
#3. 1pw
# 4.

#automate upgrades to 200,000 open source repos - saving their issues/PR and also predict which ones would accept specifically which ones.

playwright_refresh() {
    sudo playwright install chromium
}

source_url_rustdesk = "https://github.com/rustdesk/rustdesk/releases/tag/1.3.4"
wget $source_url_rustdesk 
RUSTDESK_DEB="rustdesk-1.3.4-x86_64.deb"
install_rustdesk = "dpkg -i ${RUSTDESK_DEB}"

sudo $install_rustdesk

# Update package lists
sudo apt-get update

# Install dependencies
sudo apt-get install -y \
    build-essential \
    pkg-config \
    libssl-dev \
    libclang-dev \
    cmake \
    git \
    curl



#package.json = nothing but next.js

# bun accessed via homelab restart etc 
# all hard-coded for now - only 5 script needed (some have multiple parameters)
# restart
# start 
# stop
# update
# provision storage 
# refactor 
# bazel + tests + HIL 
# nanosaur 

# build step - intermediate representation of inital source data 
#install.sh = symlink of scripts?