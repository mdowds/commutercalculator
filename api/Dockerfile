FROM mdowds/uwsgi:python3.6.5

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY . /app/api

EXPOSE 5000

CMD [ "uwsgi", "--http-socket", "0.0.0.0:5000", \
                "--uid", "uwsgi", \
                "--manage-script-name", \
                "--mount", "/commutercalculator/api=api.ccapi:app", \
                "--master"]
