//  ********Libraries********
const mysql = require("mysql");
const moment = require("moment");

//  ********Connect to The Database********
const DATABASE_CONFIG = {
  //  Use Your Database Config
};
database = mysql.createConnection(DATABASE_CONFIG);
database.connect((error) => {
  if (error) throw error;
  console.log(
    `connect to mysql, host:${DATABASE_CONFIG.host}, username:${DATABASE_CONFIG.user}, password:${DATABASE_CONFIG.password}, database:${DATABASE_CONFIG.database}`
  );
});

//  ********Exports********
module.exports = database;
