from start import start_app, Client
from threading import Thread

server = Thread(target=start_app)
server.start()

client = Client('http://localhost:5000')