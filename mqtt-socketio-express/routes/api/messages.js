//  ********Libraries********
const express = require("express");
const router = express.Router();

//  ********Flies********
const database = require("../../database/index");

//  ********Get All Messages********
router.get("/", (req, res) => {
  const sql = "SELECT * FROM messages";
  database.db.query(sql, (error, result) => {
    if (error) throw error;
    return res.json(result);
  });
});

//  ********Exports********
module.exports = router;
