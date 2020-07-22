const url = require('url');
const myUrl = new URL('https:website.com/hello.html?id=200&status=active');
console.log(myUrl);

//  SERIALIZED URL
console.log(myUrl.href.toString());

//  host (ROOT DOMAIN)
console.log(myUrl.host);

//  hostname  (DOES NOT GET PORT)
console.log(myUrl.hostname);

//  pathname
console.log(myUrl.pathname);

//  SERIALIZED QUERY
console.log(myUrl.search);

//  Params Object
console.log(myUrl.searchParams);

//  ADD Param
myUrl.searchParams.append('new', 'CL1');

//  LOOP THROUGH Params
myUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));
