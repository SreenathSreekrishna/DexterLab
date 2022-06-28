import sqlite3

class Database:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name)
        self.db = self.conn.cursor()
    
    def close(self):
        self.conn.close()
    
    def execute(self, sql, args):
        self.db.execute(sql, args)
        if sql.lower().startswith('select'):
            return self.db.fetchall()
        else:
            self.conn.commit()