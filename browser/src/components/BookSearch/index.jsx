import React, { Component } from "react";
import { Input, Button, Row, Col } from "antd";

import "./index.css";

export default class BookSearch extends Component {
  state = {
    ISBN: "",
    bookName: "",
    bookAuthor: "",
    bookPublisher: "",
  };
  static defaultProps = {
    onSearch: null,
  };
  dealChange = (key) => {
    return (event) => {
      this.setState({
        [key]: event.target.value,
      });
    };
  };
  handleClick = () => {
    const { onSearch } = this.props;
    if (typeof onSearch === "function") {
      onSearch(this.state);
    }
  };
  render() {
    return (
      <div className="BookSearch">
        <Row>
          <Col span={5}>
            <Input addonBefore="ISBN" onChange={this.dealChange("ISBN")} />
          </Col>
          <Col span={5}>
            <Input addonBefore="书名" onChange={this.dealChange("bookName")} />
          </Col>
          <Col span={5}>
            <Input addonBefore="作者" onChange={this.dealChange("bookAuthor")} />
          </Col>
          <Col span={5}>
            <Input addonBefore="出版社" onChange={this.dealChange("bookPublisher")} />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={this.handleClick}>
              搜索
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
