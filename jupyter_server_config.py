# .jupyter/jupyter_server_config.py

# Allow iframes and set appropriate CORS headers:
c.ServerApp.allow_origin = '*'
c.ServerApp.allow_credentials = True
c.ServerApp.allow_remote_access = True
c.ServerApp.disable_check_xsrf = True
# You can add other settings as needed.