FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN python -m unittest discover

EXPOSE 5000

CMD ["flask", "run"]
