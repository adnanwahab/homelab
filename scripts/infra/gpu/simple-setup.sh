#wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
#sudo dpkg -i cloudflared-linux-amd64.deb
#cloudflared tunnel login

#cloudflared tunnel create caddy-tunnel
#cloudflared tunnel route dns caddy-tunnel teach-math.com

#2607:fb90:5e82:4a5d:a18b:e3d3:fb1d:
curl ifconfig.me

dig A cgi-tools.dev


nslookup cgi-tools.dev
sudo systemctl status caddy


curl -I https://cgi-tools.dev

journalctl -u caddy --follow


echo | openssl s_client -showcerts -servername cgi-tools.dev -connect cgi-tools.dev:443
