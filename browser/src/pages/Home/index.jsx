import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { SolutionOutlined, ReadOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import Book from "../Book";
import Order from "../Order";
import Shoping from "../Shopping";

import "./index.css";

const { Header, Content, Sider } = Layout;

export default class Home extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout className="Home" style={{ minHeight: "100vh" }}>
        {/* 侧边栏 */}
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="bookList" icon={<ReadOutlined />}>
              <NavLink to="/home/book">图书列表</NavLink>
            </Menu.Item>
            <Menu.Item key="shoppingList" icon={<DollarCircleOutlined />}>
              <NavLink to="/home/shopping">购物车</NavLink>
            </Menu.Item>
            <Menu.Item key="orderList" icon={<SolutionOutlined />}>
              <NavLink to="/home/order">订单列表</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>

        {/* 主体 */}
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "8px 16px" }}>
            <Switch>
              <Route path="/home/book" component={Book} />
              <Route path="/home/order" component={Order} />
              <Route path="/home/shopping" component={Shoping} />
              <Route path="/home" component={Book} />
              <Redirect to="/home" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
