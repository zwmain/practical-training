const moment = require("moment");
const { insertIntoBookOrder, insertIntoOrder, selectAllOrder } = require("../api/order");
const message = require("./Message");

let orderIndex = 0;
async function addToOrder(res, data) {
  const { admin, bookList } = data;
  const orderTime = moment().format("YYYY-MM-DD HH:mm:ss");
  let sumMoney = 0;
  let orderId = orderTime + " " + (orderIndex++ % 10000).toString().padStart(4, "0");
  let order_book = [];
  for (let i of bookList) {
    sumMoney += i.bookPrice * i.bookNum;
    order_book.push({
      orderId,
      ISBN: i.ISBN,
      bookNum: i.bookNum,
    });
  }
  const order = {
    orderId,
    username: admin.username,
    orderTime,
    sumMoney,
  };
  try {
    let resO = await insertIntoOrder(order);
    let resB = await insertIntoBookOrder(order_book);
    if (resO && resB) {
      res.write(message(0, "下单成功"));
    } else {
      res.write(message(1, "下单失败"));
    }
  } catch (error) {
    res.write(message(1, error.toString()));
  } finally {
    res.end();
  }
}

function findAllOrder(res) {
  selectAllOrder()
    .then((result) => {
      res.write(message(0, "获取成功", result));
    })
    .catch((e) => {
      res.write(message(1, e.toString()));
    })
    .finally(() => {
      res.end();
    });
}

module.exports = { addToOrder, findAllOrder };
