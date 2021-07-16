import { csrfFetch } from "./csrf";

const SET_USER = "session/ADD_USER";
const REMOVE_USER = "session/REMOVE_USER";

const initialState = { user: null };

//action creators
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//thunk middleware
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch(`/api/session`, {
    method: "post",
    body: JSON.stringify({ credential, password }),
  });

  const data = await res.json();

  if (res.ok) {
    dispatch(setUser(data.user));
  }
  return data;
};

//reducer
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = {
        ...state,
        user: action.payload,
      };
      return newState;
    case REMOVE_USER:
      newState = {
        ...state,
        user: null,
      };
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
