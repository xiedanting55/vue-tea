const mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "root",
  database: 'tea'
})
module.exports = connection