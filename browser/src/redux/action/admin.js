import { LOGIN } from "./action";

export function acAdminLogin(data) {
  return {
    type: LOGIN,
    data,
  };
}
