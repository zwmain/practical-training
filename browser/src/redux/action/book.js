import { GET_BOOK_LIST } from "./action";

export function acBookSearch(data) {
  return {
    type: GET_BOOK_LIST,
    data,
  };
}
