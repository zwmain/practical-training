const { execSql } = require("./sql");

const tableName = "book";

/*
多条件查询书籍
{
    "ISBN":"",
    "bookName":"",
    "bookAuthor":"",
    "bookPublisher":""
}
*/
function queryBook(data) {
  const { ISBN, bookName, bookAuthor, bookPublisher } = data;
  let sql = `
    select * from ${tableName}
    where
    ISBN like '%${ISBN}%'
    and bookName like '%${bookName}%'
    and bookAuthor like '%${bookAuthor}%'
    and bookPublisher like '%${bookPublisher}%'
    `;
  return execSql(sql);
}

module.exports = { queryBook };
