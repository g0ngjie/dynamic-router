import axios from "axios";
import { Notification } from "element-ui";

// create an axios instance
const service = axios.create({
  baseURL: "/",
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const { status, data, message } = response;
    const { code, msg } = data;
    if (status !== 200) {
      Notification.error({
        title: message,
      });
      return Promise.reject(data);
    }
    if (code === 9999) {
      Notification.error(msg || "handle Error");
      return Promise.reject(data);
    }
    if (code === -1) {
      Notification.error(msg || "handle Error");
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    const { status, data } = error.response;
    const { msg: errorMsg } = data;
    // let { errorCode, errorMsg } = error.response.data;
    if (status == 500) {
      Notification.error("500");
      return;
    }
    if (status == 504) {
      Notification.error("504");
      return;
    }
    Notification.error({
      title: errorMsg,
      duration: 3000,
    });
    return Promise.reject(error.response.data);
  }
);

export default service;
