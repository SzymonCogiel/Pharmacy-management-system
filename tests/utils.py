import requests
import json

URL = "http://127.0.0.1:8000/api/pharamcy/"


def login(mail: str, password: str):
    url = URL + "login?login={0}&password={1}".format(mail, password)
    r = requests.get(url)
    return r.status_code, json.loads(r.content)


def register(login: str, mail: str, password: str):
    url = URL + "register?login={0}&password={1}&mail={2}".format(login, password, mail)
    r = requests.get(url)
    return r.status_code, r.content

def manualPDF():
    url = URL + "manual"
    r = requests.get(url)
    return r.status_code, r.content