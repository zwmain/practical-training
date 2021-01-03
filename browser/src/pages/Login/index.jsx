import React, { Component } from "react";
import { message } from "antd";
import { connect } from "react-redux";

import AdminLoginForm from "../../components/AdminLoginForm";

import { adminLogin, saveAdminToLocalStorge } from "../../api/admin";
import { acAdminLogin } from "../../redux/action/admin";

import "./index.css";

class Login extends Component {
  onSubmit = (data) => {
    this.login(data);
  };

  login = (data) => {
    adminLogin(data)
      .then((res) => {
        data = res.data;
        if (data.status === 0) {
          message.success(data.message);
          const { history, saveAdminToRedux } = this.props;
          saveAdminToRedux(data.data);
          saveAdminToLocalStorge(data.data);
          history.replace("/");
        } else {
          message.error(data.message);
        }
      })
      .catch((e) => {
        message.error("登录异常");
      });
  };

  render() {
    return (
      <div className="Login">
        <AdminLoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveAdminToRedux: (data) => {
      dispatch(acAdminLogin(data));
    },
  };
}

export default connect(null, mapDispatchToProps)(Login);
