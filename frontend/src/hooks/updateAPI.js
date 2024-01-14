import axios from "axios";

export const updateAPI = (url, data, id, contentType) => {
  console.log(url, data, id);
  const call = axios
    .put(`http://localhost:3000/${url}/${id ? id : ""}`, data, {
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
        Authorization: JSON.parse(localStorage.getItem("token")),
        userType: JSON.parse(localStorage.getItem("user")).userType,
      },
    })
    .then((res) => {
      return { success: true, data: res.data };
    })
    .catch((err) => {
      return { success: false, error: err };
    });
  return call;
};
