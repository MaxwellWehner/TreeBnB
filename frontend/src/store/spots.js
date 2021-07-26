import { csrfFetch } from "./csrf";

const ADD_ONE = "spots/ADD_ONE";
const DELETE_SPOT = "spots/DELETE_SPOT";
const LOAD = "spots/LOAD";

//action creators
const addOneSpot = (spot) => {
  return {
    type: ADD_ONE,
    spot,
  };
};

const deleteSpot = (id) => {
  return {
    type: DELETE_SPOT,
    id,
  };
};

const load = (list) => {
  return {
    type: LOAD,
    list,
  };
};

//thunks
export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getOneSpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`);

  if (res.ok) {
    const spot = await res.json();
    if (spot !== null) dispatch(addOneSpot(spot));
  }
};

export const createSpotForm = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  const newSpot = await res.json();

  if (res.ok) dispatch(addOneSpot(newSpot));

  return newSpot;
};

export const editSpotForm = (payload, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const updatedSpot = await res.json();

  if (res.ok) {
    dispatch(addOneSpot(updatedSpot));
  }

  return updatedSpot;
};

export const deleteSpotThunk = (id) => async (dispatch) => {
  await csrfFetch(`/api/spots/${id}`, {
    method: "delete",
  });

  dispatch(deleteSpot(id));
};

//reducer
const initialState = {};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allSpots = {};
      action.list.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return {
        ...allSpots,
        ...state,
      };
    }
    case ADD_ONE: {
      if (!state[action.spot.id]) {
        const newState = {
          ...state,
          [action.spot.id]: action.spot,
        };
        return newState;
      }
      return {
        ...state,
        [action.spot.id]: {
          ...state[action.spot.id],
          ...action.spot,
        },
      };
    }
    case DELETE_SPOT: {
      const updatedState = { ...state };
      delete updatedState[action.id];
      return updatedState;
    }
    default:
      return state;
  }
};

export default spotReducer;
