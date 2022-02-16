import axios from 'axios';

const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
const GET_CARDS = 'GET_CARDS';
const SET_TYPES = 'GET_TYPES';
const SET_SUBTYPES = 'GET_SUBTYPES';
const GET_POKEMON_CARD = 'GET_POKEMON_CARD';
const SET_PAGES_AMOUNT = 'SET_PAGES_AMOUNT';
const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
const SET_ERROR = 'SET_ERROR';

const initialState = {
  isLoggedIn: true,
  cards: [],
  types: [],
  subtypes: [],
  pokemonCard: {},
  itemsPerPage: 12,
  pagesAmount: 0,
  isInitialRequestDone: false,
  isLoading: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.isloggedIn };
    case GET_CARDS:
      return {
        ...state,
        cards: action.cards,
        isInitialRequestDone: true,
        isLoading: false,
        error: false,
      };
    case SET_TYPES:
      return { ...state, types: action.types };
    case SET_SUBTYPES:
      return { ...state, subtypes: action.subtypes };
    case GET_POKEMON_CARD:
      return { ...state, pokemonCard: action.card };
    case SET_PAGES_AMOUNT:
      return { ...state, pagesAmount: action.value };
    case SET_LOADING_STATUS:
      return { ...state, isLoading: action.value };
    case SET_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export function setLoggedIn(isloggedIn) {
  return { type: SET_IS_LOGGED_IN, isloggedIn };
}

export function getCards(typeSelected = '', subtypeSelected = '') {
  return (dispatch) => {
    axios(
      `https://api.pokemontcg.io/v1/cards?types=${typeSelected}&subtype=${subtypeSelected}`
    )
      .then((res) => dispatch({ type: GET_CARDS, cards: res.data.cards }))
      .catch((e) => dispatch({ type: SET_ERROR, error: true }));
  };
}

export function getFilters() {
  return (dispatch) => {
    axios('https://api.pokemontcg.io/v1/types').then((res) =>
      dispatch({
        type: SET_TYPES,
        types: res.data.types.map((it) => it.toLowerCase()).sort(),
      })
    );
    axios('https://api.pokemontcg.io/v1/subtypes').then((res) =>
      dispatch({
        type: SET_SUBTYPES,
        subtypes: res.data.subtypes.map((it) => it.toLowerCase()).sort(),
      })
    );
  };
}

export function getPokemonCard(pokemonId) {
  return (dispatch) => {
    axios(`https://api.pokemontcg.io/v1/cards?id=${pokemonId}`).then((res) =>
      dispatch({ type: GET_POKEMON_CARD, card: res.data.cards[0] })
    );
  };
}

export function setPageAmount(value) {
  return { type: SET_PAGES_AMOUNT, value };
}

export function setLoadingStatus() {
  return { type: SET_LOADING_STATUS, value: true };
}
