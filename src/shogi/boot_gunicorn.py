import os

os.system("pkill gunicorn")
os.system("gunicorn --bind 127.0.0.1:8000 shogi.wsgi -D")