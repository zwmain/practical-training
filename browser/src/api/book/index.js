import ajax from "../ajax";

function bookSearch(data) {
  return ajax("/getBookList", data);
}

export { bookSearch };
