from helium import *
start_chrome('x.com')
write('helium selenium github')
get_driver().save_screenshot(r'C:\screenshot.png')

press(ENTER)
# click('mherrmann/helium')
# go_to('github.com/login')
# write('username', into='Username')
# write('password', into='Password')
# click('Sign in')
# kill_browser()