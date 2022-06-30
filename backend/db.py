import sqlite3

class Database:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name)
        self.db = self.conn.cursor()
        self.tables =  [i[0] for i in self.execute("SELECT name FROM sqlite_master WHERE type='table'")]
        self.columns = []
        for table in self.tables:
            cursor = self.db.execute(f'SELECT * FROM {table}')
            self.columns.append([description[0] for description in cursor.description])
    
    def close(self):
        self.conn.close()
    
    def execute(self, sql, args=()):
        self.db.execute(sql, args)
        if sql.lower().startswith('select'):
            return self.db.fetchall()
        else:
            self.conn.commit()
    
    def insert(self, table, vals, columns=None):
        if columns==None:
            columns = self.columns[self.tables.index(table)][1:]
        sql = f'INSERT INTO {table}({",".join(columns)}) VALUES ({",".join(["?"]*len(vals))})'
        self.execute(sql, vals)
    
    def select(self, table, constraints=False, columns="*"):
        sql = f'SELECT {",".join(columns)} FROM {table}{f" WHERE {constraints[0]}=?" if constraints else ""}'
        return self.execute(sql, (constraints[1],) if constraints else ())