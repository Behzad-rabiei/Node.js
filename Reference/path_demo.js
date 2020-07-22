const path = require('path');
console.log(path);

//  CREATE PATH OBJECT
console.log(path.parse(__filename));
console.log(path.parse(__dirname));

//  BASE FILE NAME
console.log(path.basename(__filename));

//  DIRECTORY NAME
console.log(path.dirname(__filename));

//  FILE EXTENSION
console.log(path.extname(__filename));

//  CONCATENATE PATHS
console.log(path.join(__dirname, 'test', 'index.html'));
