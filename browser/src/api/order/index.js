import ajax from "../ajax";

function findAllOrder() {
  return ajax("/findAllOrder", null);
}

export { findAllOrder };
