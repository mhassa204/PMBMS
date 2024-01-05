import axios from "axios";

export const getAPIData = async (url, id) => {
  const call = await axios
    .get(`http://localhost:3000/${url}/${id ? id : ""}`, {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        userType: JSON.parse(localStorage.getItem("user")).userType,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return call;
};
