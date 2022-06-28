import sqlite3
from json import load

DB_NAME = 'lab.db'

def configure():
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