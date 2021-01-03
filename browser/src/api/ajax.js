import axios from "axios";
import { BASE_URL } from "./config";

//url:'/getbook'
function ajax(url, data, method = "post") {
  url = BASE_URL + url;
  return axios({
    url: url,
    method: method,
    data: JSON.stringify(data),
  });
}

export default ajax;
