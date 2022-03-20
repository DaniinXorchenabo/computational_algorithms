import os
from os.path import dirname, join, split
import asyncio
import uvicorn
from decimal import Decimal

from dotenv import load_dotenv
from wolframclient.evaluation import WolframCloudAsyncSession, SecuredAuthenticationKey
from fastapi import FastAPI
from wolframclient.serializers import export
from fastapi import FastAPI, Path, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

session: WolframCloudAsyncSession | None = None
wolfram_code: str | None = None

app = FastAPI()


@app.on_event('startup')
async def create_connection_with_wolfram():
    global session
    last_environ = {key: val for key, val in os.environ.items()}
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)
    try:
        key = SecuredAuthenticationKey(
            os.environ['CONSUMER_KEY'],
            os.environ['CONSUMER_SECRET']
        )
    except KeyError as e:
        raise AttributeError('You should set a CONSUMER_KEY and CONSUMER_SECRET environ variables.\n'
                             'See a example.env file for more information.')
    session = WolframCloudAsyncSession(credentials=key)
    await session.start()
    session.authorized()


@app.on_event('startup')
async def get_wolfram_code_from_file():
    global wolfram_code
    with open('code.nb', 'r', encoding='utf-8') as f:
        wolfram_code = f.read()


@app.on_event('shutdown')
async def create_connection_with_wolfram():
    global session
    await session.stop()


@app.get('/calculate')
async def test(p1: list[float] = Query([0]), p2: list[float] = Query([0]),
               p1_x: Decimal = 0, p2_x: Decimal = 0,
               sin_arg: Decimal = 0, cos_arg: Decimal = 0, exp_arg: Decimal = 1,
               eps='10^-8'):
    print(p1, p2)
    p1: list[int | Decimal] = [0] if p1 is None else p1
    p2: list[int | Decimal] = [0] if p2 is None else p2
    global wolfram_code
    with open('code.nb', 'r', encoding='utf-8') as f:
        wolfram_code = f.read()
    params = f"sinArg = {sin_arg};" \
             f"cosArg = {cos_arg};" \
             f"expArg = {exp_arg};" \
             f"arr1 = {'{'} {', '.join(map(str, p1))} {'}'};" \
             f"x1 = {p1_x};" \
             f"arr2 = {'{'} {', '.join(map(str, p2))} {'}'};" \
             f"x2 = {p2_x};" \
             f"eps = {eps};" + '\n'
    print(params)
    data = session.evaluate(params + wolfram_code)
    print(data)
    awaited_data = await data
    print(awaited_data)
    return awaited_data


app.mount("/public", StaticFiles(directory=join(split(__file__)[0], 'public')), name="static")

if __name__ == '__main__':
    uvicorn.run("main:app", host="localhost", port=9010, reload=True, reload_includes=['*.py', '*.nb'])
