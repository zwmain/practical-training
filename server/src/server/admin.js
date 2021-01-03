const message = require("./Message");
const { queryUser } = require("../api/admin");

/*
data类型
{
  "username":"admin",
  "password":"123456"
}

返回值
{
    "status": 0,
    "message": "登录成功",
    "data": {
        "username": "admin",
        "password": "123456"
    }
}
*/
function login(res, data) {
  //根据前端传送过来的信息查询数据库
  queryUser(data)
    .then((results) => {
      //如果查询结果不为空则登录成功
      if (results.length > 0) {
        res.write(message(0, "登录成功", results[0]));
      } else {
        res.write(message(1, "用户名或密码错误"));
      }
    })
    .catch((e) => {
      //处理异常
      console.log(e);
    })
    .finally(() => {
      //返回到前端
      res.end();
    });
}

module.exports = { login };
