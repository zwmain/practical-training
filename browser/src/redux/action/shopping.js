import { ADD_TO_SHOPPING } from "./action";

export function acAddToShop(data) {
  return {
    type: ADD_TO_SHOPPING,
    data,
  };
}
