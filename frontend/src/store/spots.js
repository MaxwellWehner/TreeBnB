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

const deleteSpot = () => {
  return {
    type: DELETE_SPOT,
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
  const res = await fetch(`/api/spots/${id}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(addOneSpot(spot));
  }
};

//reducer
const initialState = { list: [] };

const sortList = (list) => {
  return list.sort((spot1, spot2) => {
    return spot1.id - spot2.id;
  });
};

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
        list: sortList(action.list),
      };
    }
    case ADD_ONE: {
      if (!state[action.spot.id]) {
        console.log("in reducer if");
        const newState = {
          ...state,
          [action.spot.id]: action.spot,
        };
        const spotList = newState.list.map((id) => newState[id]);
        spotList.push(action.spot);
        newState.list = sortList(spotList);
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
    // case REMOVE_ITEM: {
    //   return {
    //     ...state,
    //     [action.pokemonId]: {
    //       ...state[action.pokemonId],
    //       items: state[action.pokemonId].filter(
    //         (item) => item.id !== action.itemId
    //       ),
    //     },
    //   };
    // }
    default:
      return state;
  }
};

export default spotReducer;
