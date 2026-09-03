const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname);
const port = Number(process.argv[2] || 8765);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.js': 'text/javascript',
  '.css': 'text/css'
};
http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/') p = '/Indira_Creative_Studio.html';
  const f = path.resolve(root, '.' + p);
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found ' + p); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(f).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log('READY http://127.0.0.1:' + port));
