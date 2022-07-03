from distutils.log import debug
import webview
import server
import threading
from Defines import Defines

import Api


t = threading.Thread(target=server.start)
t.start()
window = webview.create_window(
    'Woah dude!', 'http://127.0.0.1:8080', js_api=Api.API())
webview.start(debug=Defines.isDebugversion)
