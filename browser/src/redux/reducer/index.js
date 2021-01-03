import { combineReducers } from "redux";
import rdAdmin from "./admin";
import rdBook from "./book";
import rdShopping from "./shopping";
import rdGetAllOrder from "./order";

export default combineReducers({
  admin: rdAdmin,
  bookList: rdBook,
  shoppingCart: rdShopping,
  orderList: rdGetAllOrder
});
