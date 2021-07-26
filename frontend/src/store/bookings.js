import { csrfFetch } from "./csrf";

const ADD_ONE = "bookings/ADD_ONE";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";
const LOAD = "bookings/LOAD";
const REMOVE_BOOKING = "bookings/REMOVE_BOOKINGS";

//action creators
const addOneBooking = (booking) => {
  return {
    type: ADD_ONE,
    booking,
  };
};

const deleteBooking = (id) => {
  return {
    type: DELETE_BOOKING,
    id,
  };
};

const load = (list) => {
  return {
    type: LOAD,
    list,
  };
};

export const removeBookings = (userId) => {
  return {
    type: REMOVE_BOOKING,
    userId,
  };
};

//thunks
export const getUserBookings = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/user/${userId}`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getOneBooking = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/spot/${spotId}`);

  if (res.ok) {
    const booking = await res.json();
    if (booking !== null) dispatch(addOneBooking(booking));
  }
};

export const createBookingForm = (booking) => async (dispatch) => {
  const res = await csrfFetch("/api/bookings", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  const newBooking = await res.json();

  if (res.ok) dispatch(addOneBooking(newBooking));

  return newBooking;
};

export const editBookingForm = (payload, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const updatedBooking = await res.json();

  if (res.ok) {
    dispatch(addOneBooking(updatedBooking));
  }

  return updatedBooking;
};

export const deleteBookingThunk = (id) => async (dispatch) => {
  await csrfFetch(`/api/bookings/${id}`, {
    method: "delete",
  });

  dispatch(deleteBooking(id));
};

//reducer
const initialState = {};

const bookingsReducer = (state = initialState, action) => {
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
      if (!state[action.booking.id]) {
        const newState = {
          ...state,
          [action.booking.id]: action.booking,
        };
        return newState;
      }
      return {
        ...state,
        [action.booking.id]: {
          ...state[action.booking.id],
          ...action.booking,
        },
      };
    }
    case DELETE_BOOKING: {
      const updatedState = { ...state };
      delete updatedState[action.id];
      return updatedState;
    }
    case REMOVE_BOOKING: {
      return {};
    }
    default:
      return state;
  }
};

export default bookingsReducer;
