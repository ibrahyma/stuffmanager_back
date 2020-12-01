
const http = require('http');
const app = require('./app');

const hostname = 'localhost';
const port = 3200;

const server = http.createServer(app);

server.listen(port, hostname, () =>
{
    console.log(`Exécution du serveur : http://${hostname}:${port}/`);
});