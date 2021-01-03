import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, InputNumber, message } from "antd";

import { acAddToShop } from "../../redux/action/shopping";
import { addToOrder } from "../../api/shopping";

import "./index.css";

class Shopping extends Component {
  column = [
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
      title: "单价",
      dataIndex: "bookPrice",
    },
    {
      title: "数量",
      render: (text, record) => {
        return (
          <InputNumber
            size="small"
            min={1}
            max={1000}
            defaultValue={record.bookNum}
            onChange={(num) => {
              this.onNumChange(num, record);
            }}
          />
        );
      },
    },
    {
      title: "操作",
      render: (text, record) => {
        return (
          <Button
            size="small"
            onClick={() => {
              this.removeFromShopping(record);
            }}
          >
            移除
          </Button>
        );
      },
    },
  ];

  onNumChange = (num, record) => {
    const { bookMap, updateShopping } = this.props;
    let item = bookMap.get(record.key);
    let tempMap = new Map(bookMap);
    item.bookNum = num;
    tempMap.set(item.key, item);
    updateShopping(tempMap);
  };

  removeFromShopping = (record) => {
    const { bookMap, updateShopping } = this.props;
    let item = bookMap.get(record.key);
    let tempSet = new Map(bookMap);
    tempSet.delete(item.key);
    updateShopping(tempSet);
    message.success("移除成功");
  };

  clearShopping = () => {
    const { bookMap } = this.props;
    if (bookMap.size === 0) {
      message.error("购物车为空");
      return;
    }
    let bookList = [];
    for (let [, v] of bookMap) {
      bookList.push(v);
    }
    this.placeOrder(bookList);
  };

  placeOrder = (bookList) => {
    const { admin } = this.props;
    const order = {
      admin,
      bookList,
    };
    addToOrder(order)
      .then((res) => {
        res = res.data;
        if (res.status === 0) {
          const { updateShopping } = this.props;
          updateShopping(new Map());
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      })
      .catch((e) => {
        message.error(e.toString());
      });
  };

  render() {
    const { shopBooks } = this.props;
    return (
      <div className="Shopping">
        <Table dataSource={shopBooks} columns={this.column} />
        <div className="clear-shopping">
          <Button type="primary" onClick={this.clearShopping}>
            清空购物车
          </Button>
        </div>
      </div>
    );
  }
}

function mapSateToProps(state) {
  let arr = [];
  for (let [k, i] of state.shoppingCart) {
    const { ISBN, bookAuthor, bookName, bookPrice, bookPublisher, bookNum } = i;
    let obj = {
      ISBN,
      bookAuthor,
      bookName,
      bookPublisher,
      bookPrice,
      key: k,
      bookNum: typeof bookNum === "number" ? bookNum : 1,
    };
    arr.push(obj);
  }
  return {
    shopBooks: arr,
    bookMap: state.shoppingCart,
    admin: state.admin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateShopping: (data) => {
      dispatch(acAddToShop(data));
    },
  };
}

export default connect(mapSateToProps, mapDispatchToProps)(Shopping);
