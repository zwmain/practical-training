import { LOGIN } from "../action/action";

let initSatte = {
  username: "",
  password: "",
};

function rdAdmin(state = initSatte, action) {
  switch (action.type) {
    case LOGIN: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}

export default rdAdmin;
