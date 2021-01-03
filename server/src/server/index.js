const { login } = require("./admin");
const { getBookList } = require("./book");
const { addToOrder, findAllOrder } = require("./order");

function dealReq(req, res) {
  let data = "";
  req.on("data", (v) => {
    data += v.toString();
  });
  req.on("end", () => {
    data = JSON.parse(data.toString());
    switch (req.url) {
      case "/api/login": {
        login(res, data);
        break;
      }
      case "/api/getBookList": {
        getBookList(res, data);
        break;
      }
      case "/api/addToOrder": {
        addToOrder(res, data);
        break;
      }
      case "/api/findAllOrder": {
        findAllOrder(res);
        break;
      }
      default: {
        res.write(JSON.stringify({ status: 1, message: "接口不存在" }));
        res.end();
        break;
      }
    }
  });
}

// 设置跨域
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Accept");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Headers", "Referer");
  res.setHeader("Content-Type", "application/x-www-form-urlencoded");
  res.setHeader("Accept", "application/json, text/plain, */*");
  res.setHeader("Referer", "http://127.0.0.1:3000/");

  // res.setHeader("Content-Type", "application/json;charset=utf-8");
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
}

module.exports = { dealReq, setCors };
