const mysql = require("mysql");

const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "practical",
  timezone: "8:00",
};

const MySqlConnect = mysql.createConnection(config);

function initSqlConnect() {
  return new Promise((resolve) => {
    MySqlConnect.connect((err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function execSql(sql = "") {
  return new Promise((resolve, reject) => {
    MySqlConnect.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = { MySqlConnect, initSqlConnect, execSql };
