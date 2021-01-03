import { GET_ALL_ORDER } from "../action/action";

let initState = [];

function rdGetAllOrder(state = initState, action) {
  switch (action.type) {
    case GET_ALL_ORDER: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}

export default rdGetAllOrder;
