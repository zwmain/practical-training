const { queryBook } = require("../api/book");
const message = require("./Message");

/*
多条件查询书籍
{
    "ISBN":"",
    "bookName":"",
    "bookAuthor":"",
    "bookPublisher":""
}
*/
function getBookList(res, data) {
  queryBook(data)
    .then((result) => {
      res.write(message(0, "查询成功", result));
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      res.end();
    });
}

module.exports = { getBookList };
