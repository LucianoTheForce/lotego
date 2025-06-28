const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = true;
const hostname = '0.0.0.0';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`🚀 LotGo rodando em:
    • http://localhost:${port}
    • http://127.0.0.1:${port}
    • http://0.0.0.0:${port}
    
    🪟 No Windows, tente:
    • http://$(hostname -I  < /dev/null |  awk '{print $1}'):${port}
    `);
  });
});
