import * as WebSocket from 'ws';

function open() {
    const socket = new WebSocket('ws://127.0.0.1:3010/ws?a=b');
    return new Promise<WebSocket>((res) => {
        socket.addEventListener('open', (evt) => {
            console.log('open');
            res(evt.target);
        });
        socket.addEventListener('error', (err) => {
            console.log(err);
        });
    });
}

async function main() {
    const socket = await open();
    socket.send(
        JSON.stringify({
            event: 'events',
            data: 'test',
        }),
    );
}

process.nextTick(main);
