from utils import login, register, manualPDF, stock, drugs
import unittest
import os
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Integer, String, Column, delete
from sqlalchemy.ext.declarative import declarative_base
import pandas as pd
import json


pg_pass = os.environ.get('POSTGRES_PASS', '')

engine = sa.create_engine('postgresql+psycopg2://postgres:{0}@localhost:5432/pharmacy'.format(pg_pass))
Session = sessionmaker(bind=engine)
session = Session()
base = declarative_base()


class Users(base):
    __tablename__ = 'system_user'

    id = Column(Integer, primary_key=True)
    user_name = Column(String)
    mail = Column(String)
    password = Column(String)

    def __init__(self, id, user_name, mail, passsword):
        self.id = id
        self.user_name = user_name
        self.mail = mail
        self.password = passsword


class TestAPI(unittest.TestCase):

    def test_login(self):
        tupl = login('szymon', 'zle')
        assert tupl[1]['res'] == 'denial'

    def test_manual_PDF(self):
        r = manualPDF()
        assert isinstance(r[1], bytes)
        assert r[0] == 200

    def test_register_api(self):
        tupl = register('szymon', 'cogiel@student.agh.edu.pl', 'cs')
        assert tupl[1].decode("utf-8") == 'Istnieje juz konto o takim logine'

    def test_register_db(self):
        statement = "SELECT * FROM system_user"
        count_bef = pd.read_sql(
            statement,
            con=engine
        ).count().id
        tupl = register('sfajasasfk', 'pajaaczek@agh.edu.pl', 'passwarsfasf')
        assert tupl[0] == 201
        count_ac = pd.read_sql(
            statement,
            con=engine
        ).count().id
        assert count_bef + 1 == count_ac
        sql2 = delete(Users).where(Users.mail == 'pajaaczek@agh.edu.pl')
        session.execute(sql2)
        session.commit()

    def test_stock(self):
        foo = {
            "drugname": True,
            "price": True,
            "amount": True,
        }
        r = stock("Mirtazapine", 100, 68.0)
        res = json.loads(r[1].decode("utf-8"))
        assert res[0].keys() == foo.keys()

    def test_drugs(self):
        foo = {
            "uniqueid": True,
            "drugname": True,
            "condition": True,
            "review": True,
            "rating": True,
            "usefulcount": True
        }
        r = drugs("Mirtazapine")
        res = json.loads(r[1].decode("utf-8"))
        assert res[0].keys() == foo.keys()


if __name__ == '__main__':
    unittest.main()
