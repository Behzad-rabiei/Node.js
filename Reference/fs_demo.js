const fs = require('fs');
const path = require('path');

console.log(fs);

//  CREATE FOLDER
const folderPath = path.join(__dirname, 'test');
fs.mkdir(folderPath, {}, mkdirCallBack);
function mkdirCallBack(error) {
  if (error) throw error;
  console.log('Folder Created');
}

//  CREATE && WRITE(OVERRIDE) TO FILE
const writeContent = 'Hello World';
const filePath = path.join(__dirname, '/test', 'test.txt');
fs.writeFile(filePath, writeContent, writeCallBack);
function writeCallBack(error) {
  if (error) throw error;
  console.log('File Written to ...');
}

//  APPEND TO FILE
const appendContent = 'I Love JS';
fs.writeFile(filePath, writeContent, appendCallBack);
function appendCallBack(error) {
  if (error) throw error;
  fs.appendFile(filePath, appendContent, error => {
    if (error) throw error;
    console.log('File Written to ...');
  });
}

//  READ FILE
fs.readFile(filePath, 'utf8', readCallBack);
function readCallBack(error, data) {
  if (error) throw error;
  console.log(data);
}

//  RENAME FILE
const renameFile = path.join(__dirname, 'test/', 'renamed.txt');
fs.rename(filePath, renameFile, renameCallBack);
function renameCallBack(error) {
  if (error) throw error;
  console.log('File Renamed...');
}
