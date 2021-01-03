import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";

import { findAllOrder } from "../../api/order";
import { acGetAllOrder } from "../../redux/action/order";

import "./index.css";
/*

orderId
orderTime
sumMoney
username
*/
class Order extends Component {
  constructor(props) {
    super(props);

    this.column = [
      {
        title: "订单号",
        dataIndex: "orderId",
      },
      {
        title: "下单时间",
        dataIndex: "orderTime",
      },
      {
        title: "总金额",
        dataIndex: "sumMoney",
      },
      {
        title: "经办人",
        dataIndex: "username",
      },
    ];

    this.getAllOrder();
  }

  getAllOrder = () => {
    findAllOrder()
      .then((res) => {
        res = res.data;
        const { saveOrderList } = this.props;
        if (res.status === 0 && res.data.length > 0) {
          saveOrderList(Array.from(res.data));
        } else {
          saveOrderList([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { orderList } = this.props;
    return <div className="Order">
      <Table columns={this.column} dataSource={orderList} rowKey={(record)=>{
        return record.orderId;
      }} />
    </div>;
  }
}

function mapStateToProp(state) {
  const { orderList } = state;
  return {
    orderList,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    saveOrderList: (data) => {
      dispatch(acGetAllOrder(data));
    },
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(Order);
