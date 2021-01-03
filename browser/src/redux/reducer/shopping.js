import { ADD_TO_SHOPPING } from "../action/action";

let initState = new Map();

function rdShopping(state = initState, action) {
  switch (action.type) {
    case ADD_TO_SHOPPING: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}

export default rdShopping;
