import sqlalchemy
import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
import numpy as np
from matplotlib.pyplot import figure
import math

from sqlalchemy import create_engine

pg_pass = os.environ.get('POSTGRES_PASS','')
engine = create_engine( 'postgresql+psycopg2://postgres:{0}@localhost:5432/pharmacy'.format(pg_pass))

if __name__ == '__main__':

  
    cena = pd.read_sql_query('SELECT price FROM drugs_info', con=engine)
    plt.figure(1, figsize=(8, 8))
    plt.hist(cena)
    plt.xlabel('Cena [zł])',size=40)
    plt.ylabel('Ilość',size=40)
    plt.grid(True)
    plt.title('Najpopularniejsze ceny',size=40)
    plt.savefig('../../frondend/src/Plots/cena.png')
    plt.show()

    rodzaje=pd.read_sql_query('SELECT condition, COUNT(*) FROM drugs GROUP BY condition ORDER BY count DESC LIMIT 5;', con=engine)
    plt.figure(1, figsize=(8, 8))
    plt.scatter(rodzaje['condition'],rodzaje['count'])
    plt.xlabel('Przeznaczenie leku',size=40)
    plt.ylabel('Ilość',size=40)
    plt.title('Najpopularniejsze rodzaje leków',fontsize=30)
    plt.savefig('../../frondend/src/Plots/rodzaje.png')
    plt.show()
    #plt.figure(1,figsize=(8,8))
    #rodzaje_all = pd.read_sql_query('SELECT condition, COUNT(*) FROM drugs GROUP BY condition',con=engine)
    #plt.pie(rodzaje_all,labels=)





