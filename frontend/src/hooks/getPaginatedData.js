import axios from "axios";
export const getPaginatedData = async (url, currentPage, itemsPerPage, id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const call = await axios
    .get(
      `http://localhost:3000/${url}/${currentPage}/${itemsPerPage}/${
        id ? id : ""
      }`,
      {
        headers: {
          Authorization: token,
          userType: JSON.parse(localStorage.getItem("user")).userType
            ? JSON.parse(localStorage.getItem("user")).userType
            : "",
        },
      }
    )
    .then((res) => {
      return { success: true, data: res.data };
    })
    .catch((err) => {
      return { success: false, error: err };
    });
  return call;
};
