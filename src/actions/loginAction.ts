export const actionTypes: any = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",
  SET_MESSAGE: "SET_MESSAGE",
  CLEAR_MESSAGE: "CLEAR_MESSAGE",
  LOGIN: "LOGIN",
  DELETE: "DELETE",
  DELETE_FAIL: "DELETE_FAIL",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  UPDATE_WORKER_FAILED: "UPDATE_WORKER_FAILED",
  UPDATE_WORKER_SUCCESS: "UPDATE_WORKER_SUCCESS",
  UPDATE_WORKER: "UPDATE_WORKER",
  ADD_WORKER: "ADD_WORKER",
  ADD_WORKER_SUCCESS: "ADD_WORKER_SUCCESS",
  ADD_WORKER_FAILED: "ADD_WORKER_FAILED",
};
export const LoginUser = (params: any) => {
  return {
    type: actionTypes.LOGIN,
    data: params,
  };
};
export const Logout = (data: any) => {
  return {
    type: actionTypes.LOGOUT,
    data,
  };
};
export const LoginSucess = (data: any) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data,
  };
};
export const LoginFail = (data: any) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    data,
  };
};
export const Delete = (id: any, userid: any) => {
  return {
    type: actionTypes.DELETE,
    id,
    userid,
  };
};
export const DeleteSuccess = (id: any, data: any) => {
  return {
    type: actionTypes.DELETE_SUCCESS,
    id,
    data,
  };
};
export const DeleteFail = (id: any) => {
  return {
    type: actionTypes.DELETE_FAIL,
    data: id,
  };
};
export const UpdateWorker = (id: any, data: any) => {
  return {
    type: actionTypes.UPDATE_WORKER,
    id,
    data,
  };
};
export const UpdateWorkerSuccess = (id: any, data: any) => {
  return {
    type: actionTypes.UPDATE_WORKER_SUCCESS,
    id,
    data,
  };
};
export const UpdateWorkerFailed = (id: any, data: any) => {
  return {
    type: actionTypes.UPDATE_WORKER_FAILED,
    id,
    data,
  };
};
export const addWorker = (id: any, data: any) => {
  return {
    type: actionTypes.ADD_WORKER,
    id,
    data,
  };
};
export const addWorkerSuccess = (data: any) => {
  return {
    type: actionTypes.ADD_WORKER_SUCCESS,
    data,
  };
};
export const AddWorkerFailed = (id: any, data: any) => {
  return {
    type: actionTypes.ADD_WORKER_FAILED,
    id,
    data,
  };
};
