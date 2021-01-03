const { execSql } = require("./sql");

const tableName = "order";

/*
INSERT INTO `order`(username,orderTime,sumMoney) VALUES
('admin','2020-12-30 08:00:00',342)
*/
function insertIntoOrder(data) {
  const { orderId, username, orderTime, sumMoney } = data;
  let sql = `
  insert into \`order\`(orderId,username,orderTime,sumMoney)
  values ('${orderId}','${username}','${orderTime}',${sumMoney})
  `;
  return execSql(sql);
}

function insertIntoBookOrder(data) {
  let values = "";
  for (let i of data) {
    const { orderId, ISBN, bookNum } = i;
    values += `('${orderId}','${ISBN}',${bookNum}),`;
  }
  values = values.slice(0, values.length - 1);
  let sql = `
  insert into order_book(orderId, ISBN, bookNum)
  values ${values}
  `;
  return execSql(sql);
}

function selectAllOrder() {
  let sql = `
  select * from \`order\`
  `;
  return execSql(sql);
}

module.exports = { insertIntoBookOrder, insertIntoOrder, selectAllOrder };
