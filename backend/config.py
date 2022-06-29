import os
import sqlite3
from json import load
from random import randbytes
from dotenv import load_dotenv
load_dotenv()

DB_NAME = os.environ['DB_NAME']

def configure(env=True, _db=True):
    if env:
        key = hex(int.from_bytes(randbytes(64),'big'))[2:].zfill(128)
        with open('.env', 'a') as f:
            f.write(f'SECRET_KEY={key}\n')

    if _db:
        with open("db_schema.json") as f:
            tables = load(f)

        conn = sqlite3.connect(DB_NAME)
        db = conn.cursor()

        for table in tables:
            cols = ''
            for i,col in enumerate(table['cols']):
                cols += f"{col['name']} {col['dType']} {col['key']+' KEY' if col['key'] else ''}{'' if i==len(table['cols'])-1 else ', '}"
            sql = f"CREATE TABLE {table['name']} ({cols})"
            print(sql)
            db.execute(sql)
            conn.commit()

        conn.close()

if __name__ == "__main__":
    configure()