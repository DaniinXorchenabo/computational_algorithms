import os
from os.path import dirname, join, split
import asyncio
import uvicorn
from decimal import Decimal
from typing import Any

from dotenv import load_dotenv
from wolframclient.evaluation import WolframCloudAsyncSession, SecuredAuthenticationKey
from fastapi import FastAPI
from wolframclient.serializers import export
from fastapi import FastAPI, Path, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from wolframclient.language.expression import WLFunction
from wolframclient.utils.packedarray import PackedArray

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


@app.get('/calculate', response_model=list[list[Decimal]] | Any)
async def test(n: int = 10, min_: Decimal = -10, max_: Decimal = 10, eps='10^-20'):
    global wolfram_code
    with open('code.nb', 'r', encoding='utf-8') as f:
        wolfram_code = f.read()

    # How to update part in matrix see: https://reference.wolfram.com/language/howto/UpdatePartsOfAMatrix.html
    params = f'n = {n};' \
             f'minValue = {min_};' \
             f'maxValue = {max_};' \
             f'eps = {eps};'
    print(params)

    data = session.evaluate(params + wolfram_code)
    print(data)
    awaited_data: PackedArray = await data
    print(awaited_data, type(awaited_data))

    # awaited_data.tolist()

    return ([','.join(map(lambda i: str(round(i, 30)).center(20), i)) for i in awaited_data] if hasattr(awaited_data, 'tolist') else awaited_data)


app.mount("/public", StaticFiles(directory=join(split(__file__)[0], 'public')), name="static")

if __name__ == '__main__':
    uvicorn.run("main:app", host="localhost", port=9010, reload=True, reload_includes=['*.py', '*.nb'])
