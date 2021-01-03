import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, message } from "antd";

import BookSearch from "../../components/BookSearch";

import { bookSearch } from "../../api/book";
import { acBookSearch } from "../../redux/action/book";
import { acAddToShop } from "../../redux/action/shopping";

import "./index.css";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryCondition: {
        ISBN: "",
        bookName: "",
        bookAuthor: "",
        bookPublisher: "",
      },
    };

    this.column = [
      {
        title: "ISBN",
        dataIndex: "ISBN",
      },
      {
        title: "书名",
        dataIndex: "bookName",
      },
      {
        title: "作者",
        dataIndex: "bookAuthor",
      },
      {
        title: "出版社",
        dataIndex: "bookPublisher",
      },
      {
        title: "添加到购物车",
        render: (text, record) => {
          return (
            <Button
              size="small"
              onClick={() => {
                this.addToShoppingCart(record);
              }}
            >
              添加
            </Button>
          );
        },
      },
    ];

    this.getBookList();
  }

  addToShoppingCart = (record) => {
    const { addBookToShopping, shoppingCart } = this.props;
    if (shoppingCart.has(record.key)) {
      message.warning("购物车中已存在");
    } else {
      let temp = new Map(shoppingCart);
      temp.set(record.key, record);
      addBookToShopping(temp);
      message.success("添加成功");
    }
  };

  getBookList = async () => {
    let data = {
      ISBN: "",
      bookName: "",
      bookAuthor: "",
      bookPublisher: "",
    };
    try {
      let res = await bookSearch(data);
      res = res.data;
      const { saveBookToRedux } = this.props;
      if (res.status === 0) {
        saveBookToRedux(this.formatData(res.data));
        // saveBookToRedux(res.data);
      } else {
        saveBookToRedux([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  formatData = (data) => {
    let arr = [];
    for (let v of data) {
      arr.push({
        key: v.ISBN,
        ISBN: v.ISBN,
        bookName: v.bookName,
        bookAuthor: v.bookAuthor,
        bookPublisher: v.bookPublisher,
        bookPrice: v.bookPrice,
      });
    }
    return arr;
  };

  searchBook = (data) => {
    bookSearch(data)
      .then((res) => {
        res = res.data;
        const { saveBookToRedux } = this.props;
        if (res.status === 0) {
          saveBookToRedux(this.formatData(res.data));
          // saveBookToRedux(res.data);
        } else {
          saveBookToRedux([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { bookList } = this.props;
    return (
      <div className="Book">
        <BookSearch onSearch={this.searchBook} />
        <Table dataSource={bookList} columns={this.column} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveBookToRedux: (data) => {
      dispatch(acBookSearch(data));
    },
    addBookToShopping: (data) => {
      dispatch(acAddToShop(data));
    },
  };
}

function mapStateToProps(state) {
  return {
    bookList: state.bookList,
    shoppingCart: state.shoppingCart,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);
