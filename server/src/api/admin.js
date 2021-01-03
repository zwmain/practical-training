const { execSql } = require("./sql");

const tableName = "admin";

function queryUser(data) {
  let sql = `
    select * from ${tableName}
    where username='${data.username}' and password='${data.password}'
    `;
  return execSql(sql);
}

function queryUserById(userId = "") {
  let sql = `
    select * from ${tableName}
    where username='${userId}'
    `;
  return execSql(sql);
}

function insertUser(user) {
  const sql = `
    insert into ${tableName}
    values('${user.userId}','${user.userName}','${user.userGender}','${user.password}')
    `;
  return execSql(sql);
}

module.exports = {
  queryUser,
  queryUserById,
  insertUser,
};
