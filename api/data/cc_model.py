import peewee
import os


class CCModel(peewee.Model):
    class Meta:
        database = peewee.SqliteDatabase(os.path.join(os.getcwd(), 'data', 'ccdb.sqlite'))
