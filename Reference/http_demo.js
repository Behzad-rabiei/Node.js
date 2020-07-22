const http = require('http');

//  CREATE SERVER OBJECT
http.createServer(server).listen(5000, callBack);


function server(req, res) {
  //  Write response
  res.write('Hello World');
  res.end();
}

function callBack() {
  console.log('Server Running');
}
