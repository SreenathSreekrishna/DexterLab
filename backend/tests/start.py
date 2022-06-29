import os, sys
sys.path.append(os.path.abspath(os.path.join('..', 'backend')))

from app import app
import requests as r

class Client:
    def __init__(self, url):
        self.session = r.Session()
        self.url = url
        self.endpoint = '/'
    
    def post(self, data):
        return self.session.post(self.url+self.endpoint, data).json()
    
    def get(self, data=None):
        return self.session.post(self.url+self.endpoint, data).json()

def start_app(**kwargs):
    app.run(**kwargs)