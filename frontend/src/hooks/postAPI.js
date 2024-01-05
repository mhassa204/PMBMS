import axios from "axios";
export const postAPI = async (url, data, contentType) => {
  const call = await axios
    .post(`http://localhost:3000/${url}`, data, {
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
