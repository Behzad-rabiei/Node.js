const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;
const server = http.createServer((req, res) => {
  if (req.url === '/api/users') {
    apiUsers(req, res);
  }
  else {
    loadPage(req, res);
  }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

function loadPage(req, res) {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  let extname = path.extname(filePath);
  let contentType = setContentType(extname);
  //  READ FILE
  fs.readFile(filePath, (error, content) => {
    if (error) errorHandler(error, res);
    else {
      //  SUCCESS
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
}

function errorHandler(error, res) {
  if (error.code === 'ENOENT') {
    // Page not found
    fs.readFile(
      path.join(__dirname, 'public', '404.html'),
      (error, content) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(content, "utf8");
      }
    );
  } else {
    //  Some server error
    res.writeHead(500);
    res.end(`Server Error: ${error.code}`);
  }
}

function setContentType(extname) {
  switch (extname) {
    case '.js': return 'text/javascript';
    case '.css': return 'text/css';
    case '.html': return 'text/html';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpg';
    default: console.error('extname not found');
  }
}


function apiUsers(req, res) {
  const users = [
    { id: 1, name: 'Behzad' },
    { id: 2, name: 'Joe' },
    { id: 3, name: 'Mehran' },
  ];
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}
