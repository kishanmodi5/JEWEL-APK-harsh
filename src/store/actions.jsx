import jwtAuthAxios from "../service/jwtAuth";

export const addToCart = () => {
  return async (dispatch) => {
    try {
      const response = await jwtAuthAxios.get("client/cart");
      dispatch({ type: "INIT_CART", payload: response.data });
    } catch (error) {
      console.error("Error fetching cart data:", error?.response?.data?.error);
    }
  };
};

export const updateToCart = (data) => {
  return async (dispatch) => {
    try {
      const response = await jwtAuthAxios.put("client/cart/update", data);
      dispatch({ type: "UPDATE_CART", payload: response.data[0] });
    } catch (error) {
      console.error("Error fetching cart data:", error?.response?.data?.error);
    }
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_CART" });
  };
};

export const showCarts = (data) => {
  return (dispatch) => {
    dispatch({ type: "SHOW_CARTS", payload : data });
  };
};

export const setFilter = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_FILTER", payload: data });
  };
};

