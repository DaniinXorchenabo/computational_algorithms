import os
from os.path import dirname, join
import asyncio
import uvicorn

from dotenv import load_dotenv
from wolframclient.evaluation import WolframCloudAsyncSession, SecuredAuthenticationKey
from fastapi import FastAPI
from wolframclient.serializers import export

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
async def test():
    global wolfram_code
    with open('code.nb', 'r', encoding='utf-8') as f:
        wolfram_code = f.read()
    P1 = [1, 5, 7, 8]
    P2 = [4,7,0,3]
    P1_x = 2
    P2_x = 3
    t = 5
    sin_arg = 1
    cos_arg = 1
    eps = 10**-8
    params = f"sinArg = {sin_arg};" \
             f"cosArg = {cos_arg};" \
             f"arr1 = {'{'} {', '.join(map(str, P1))} {'}'};" \
             f"x1 = {P1_x};" \
             f"arr2 = {'{'} {', '.join(map(str, P2))} {'}'};" \
             f"x2 = {P2_x};" \
             f"eps = {eps};" + '\n'

    data = session.evaluate(params + wolfram_code)

    '''
            
    ;
    a = 0.41714;
    sinX[a, 10^-8]

            
    x = Mod[x, 2 * N[Pi, 50]];
            x = If[x >= N[Pi, 50], -Mod[x, N[Pi, 50]], Mod[x, N[Pi, 50]]];
        
    '''
    print(type(data), data, dir(data), {i: getattr(data, i) for i in dir(data)})
    data = await data
    print(type(data), data, dir(data), {i: getattr(data, i) for i in dir(data)})

    return data


if __name__ == '__main__':
    uvicorn.run("main:app", host="localhost", port=9010, reload=True, reload_includes=['*.py', '*.nb'])
