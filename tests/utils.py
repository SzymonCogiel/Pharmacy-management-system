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


def stock(drugname: str, amount: int, price: float):
    url = URL + "stock?drugname={0}&amount={1}&price={2}".format(drugname, amount, price)
    r = requests.get(url)
    return r.status_code, r.content

def drugs(drugname: str):
    url = URL + "drugs?drugname={0}".format(drugname)
    r = requests.get(url)
    return r.status_code, r.content
