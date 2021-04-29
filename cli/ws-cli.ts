import * as WebSocket from 'ws';

function open() {
    const socket = new WebSocket('ws://127.0.0.1:3010/ws?a=' + Math.random());
    return new Promise<WebSocket>((res) => {
        socket.addEventListener('open', (evt) => {
            console.log('open');
            res(evt.target);
        });
        socket.addEventListener('close', () => {
            console.log('close');
            process.exit();
        });
        socket.addEventListener('error', (err) => {
            console.log(err);
        });
        socket.addEventListener('message', (evt) => {
            console.log(evt.data);
        });
    });
}

async function main() {
    const socket = await open();
    setInterval(() => {
        socket.send(JSON.stringify({ event: 'events', data: 'test' }));
    }, 1000);
}

process.nextTick(main);
