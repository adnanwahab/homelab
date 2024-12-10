# Index of Hardware
# 0. Jetson Orin
#   1. Zed 2i
#   2. trossen + lerobot
#   3.
#  add a new device + logging + error_handling to tailscale device list



install_zed_2i () {
    echo "installing zed2i"
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
    before_install
    install_zed_2i
    install_lerobot
    install_nanosaur
    #https://github.com/adnanwahab/hashirama_last_archive/blob/main/scripts/_gen_install.sh
    #https://google.github.io/styleguide/shellguide.html#s7.1-function-names
}

main_exec_bootsrap_script_from_install()



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
