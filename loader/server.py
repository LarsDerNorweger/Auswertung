from http.server import BaseHTTPRequestHandler, HTTPServer
import logging
import os

BASEPATH = os.path.join(os.path.dirname(__file__), "../")
START = 'index.html'

MIMETYPES = {
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.htm': 'text/html',
    '.png': 'image/png',
    '.ico': 'image/vnd.microsoft.icon',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
}


class Webserver(BaseHTTPRequestHandler):
    def do_GET(self):
        self.respond()

    def do_HEAD(self):
        return

    def do_POST(self):
        return

    def handle_http(self):
        respath: str = tryGetFile(self.path)

        if respath != None:
            self.send_response(200)
        else:
            self.send_response(404)

        self.send_header('Content-type', tryGetMimeType(respath))
        self.end_headers()
        if respath != None:
            f = open(respath, "rb")
            return f.read()
        else:
            return bytes('File Not Found', 'UTF-8')

    def respond(self):
        content = self.handle_http()
        self.wfile.write(content)


def tryGetFile(path: str):
    if path == '/':
        return os.path.join(BASEPATH, START)

    p = os.path.join(BASEPATH, path[1:])
    if os.path.exists(p):
        return p
    return None


def tryGetMimeType(path: str):
    if path == None:
        return MIMETYPES['.html']

    name, ext = os.path.splitext(path)
    try:
        return MIMETYPES[ext]
    except:
        return 'application/octet-stream'


def start():
    try:
        webserver = HTTPServer(('127.0.0.1', 8080), Webserver)
        webserver.serve_forever()
        logging.debug("Server is listen")
    except:
        logging.warn("Error")
        pass
