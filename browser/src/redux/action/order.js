import { GET_ALL_ORDER } from "./action";

function acGetAllOrder(data) {
  return {
    type: GET_ALL_ORDER,
    data,
  };
}

export { acGetAllOrder };
