import peewee
import os

db = peewee.SqliteDatabase(os.path.join(os.getcwd(), 'api', 'data', 'ccdb.sqlite'))