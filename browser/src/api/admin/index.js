import ajax from "../ajax";

function adminLogin(data) {
  return ajax("/login", data);
}

function saveAdminToLocalStorge(data) {
  if (typeof data !== "object") data = {};
  let str = window.btoa(JSON.stringify(data));
  window.localStorage.setItem("admin", str);
}

function readAdminFromLocalStorge() {
  let data = window.localStorage.getItem("admin");
  if (typeof data !== "string") return null;
  try {
    data = JSON.parse(window.atob(data));
  } catch (e) {
    data = null;
  }
  return data;
}

export { adminLogin, saveAdminToLocalStorge, readAdminFromLocalStorge };
