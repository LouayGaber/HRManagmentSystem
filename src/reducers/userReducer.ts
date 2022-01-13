import { actionTypes } from "../actions/loginAction";
const userJson = localStorage?.getItem("user");
const user = userJson ? JSON.parse(userJson) : null;
export const initialState = user
  ? { isLoggedIn: true, userDetails: user }
  : { isLoggedIn: false, userDetails: user };

const reducer = (state = initialState, action: any) => {
  const { type, data } = action;

  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userDetails: data,
        completed: true,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userDetails: null,
        completed: true,
        error: data.message,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userDetails: null,
      };
    case actionTypes.DELETE_SUCCESS:
      const userDetailsObj = {
        ...state.userDetails,
        workers: data,
      };
      localStorage.setItem("user", JSON.stringify(userDetailsObj));
      return {
        ...state,
        isLoggedIn: true,
        userDetails: userDetailsObj,
      };
    case actionTypes.UPDATE_WORKER_SUCCESS:
      const { id } = action;
      const workers = state.userDetails.workers;
      const index = workers
        .map(function (item: any) {
          return item.id;
        })
        .indexOf(id);
      const newWorkers = [...workers];
      newWorkers.splice(index, 1, { ...workers[index], ...data.data });
      let newUserDetails = {
        ...state.userDetails,
        workers: newWorkers,
      };
      localStorage.setItem("user", JSON.stringify(newUserDetails));
      return {
        ...state,
        userDetails: newUserDetails,
      };
    case actionTypes.ADD_WORKER_SUCCESS:
      const NewUserData = {
        ...state.userDetails,
        workers: state.userDetails.workers.concat(action.data),
      };
      localStorage.setItem("user", JSON.stringify(NewUserData));

      return {
        ...state,
        isLoggedIn: true,
        userDetails: NewUserData,
      };
    default:
      return state;
  }
};
export default reducer;
