import { csrfFetch } from "./csrf";

const ADD_SPOT = "spots/ADD_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";
const LOAD = "spots/LOAD";

//action creators
const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
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
  const list = await response.json();

  if (response.ok) {
    dispatch(load(list));
  }
  return list;
};

//reducer
const initialState = {};

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
    // case ADD_ONE: {
    //   if (!state[action.pokemon.id]) {
    //     const newState = {
    //       ...state,
    //       [action.pokemon.id]: action.pokemon,
    //     };
    //     const pokemonList = newState.list.map((id) => newState[id]);
    //     pokemonList.push(action.pokemon);
    //     newState.list = sortList(pokemonList);
    //     return newState;
    //   }
    //   return {
    //     ...state,
    //     [action.pokemon.id]: {
    //       ...state[action.pokemon.id],
    //       ...action.pokemon,
    //     },
    //   };
    // }
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
