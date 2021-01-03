import ajax from "../ajax";

function addToOrder(data) {
  return ajax("/addToOrder", data);
}

export { addToOrder };
