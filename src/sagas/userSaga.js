import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  actionTypes,
  addWorkerSuccess,
  DeleteSuccess,
  LoginFail,
  LoginSucess,
  UpdateWorkerSuccess,
} from "../actions/loginAction";
import authService from "../services/auth.service";
const backEndHost = "http://localhost:3001/api";
function fetching(data, prefix, method = "POST") {
  let response = fetch(`${backEndHost}/${prefix}`, {
    method,
    body: JSON.stringify(data?.data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log(err));
  return response;
}
function* loginUser(params) {
  try {
    const { username, password } = params?.data;
    const data = yield authService.login(username, password).then(
      (data) => {
        return Promise.resolve(data);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    yield put(LoginSucess(data));
  } catch (error) {
    yield put(LoginFail(error));
  }
}
function* logout() {
  yield authService.logout();
}
function* deleteSaga(id, userid) {
  const data = yield authService.deleteUser(id, userid).then(
    (data) => {
      return Promise.resolve(data);
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  if (data && data.data?.message && data.data.workers) {
    yield put(DeleteSuccess(id, data.data.workers));
  }
}
function* updateWorker(data) {
  try {
    const response = yield authService.updateWorker(data).then(
      (response) => {
        return Promise.resolve(response);
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    if (response && !response.data?.error) {
      yield put(UpdateWorkerSuccess(data.id, data));
    }
  } catch (error) {}
}
function* addWorker(data) {
  try {
    const response = yield authService.addWorker(data).then(
      (response) => {
        return Promise.resolve(response);
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    if (response && !response.data?.error && response.data.data) {
      yield put(addWorkerSuccess(response.data.data));
    }
  } catch (error) {}
}
export default [
  takeLatest(actionTypes.LOGIN, loginUser),
  takeLatest(actionTypes.LOGOUT, logout),
  takeLatest(actionTypes.DELETE, deleteSaga),
  takeLatest(actionTypes.UPDATE_WORKER, updateWorker),
  takeLatest(actionTypes.ADD_WORKER, addWorker),
];
