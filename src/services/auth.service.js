import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:3001/api/";

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const deleteUser = ({ id, userid }) => {
  return axios.delete(API_URL + `delete/${userid}/${id}`, {
    headers: authHeader(),
  });
};
const updateWorker = ({ data, id }) => {
  return axios.put(
    API_URL + `worker/${id}`,
    { data },
    {
      headers: authHeader(),
    }
  );
};
const addWorker = ({ data, id }) => {
  return axios.post(
    API_URL + `addworker`,
    { data },
    {
      headers: authHeader(),
    }
  );
};
export default {
  login,
  logout,
  deleteUser,
  updateWorker,
  addWorker,
};
