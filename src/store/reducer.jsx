const initialState = { cart: [], filters: [] , showCarts:false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "UPDATE_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "CLEAR_CART":
      return initialState;

      case "SHOW_CARTS":
        return {...state, showCarts: action.payload};

    case "SET_FILTER":
      return {
        ...state,
        filters: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
const filterinitialState = {};
export const filterReducer = (state = filterinitialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filters: action.payload,
      };

    default:
      return state;
  }
};

