import { GET_BOOK_LIST } from "../action/action";

let initState = [];

function rdBook(state = initState, action) {
  switch (action.type) {
    case GET_BOOK_LIST: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}

export default rdBook;
