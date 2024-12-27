export const addProductToCart = (dispatch, product) => {
  dispatch({ type: 'ADD_TO_CART', payload: product });
};

export const updateShippingInfo = (dispatch, info) => {
  dispatch({ type: 'UPDATE_SHIPPING_INFO', payload: info });
};

export const updateBillingInfo = (dispatch, info) => {
  dispatch({ type: 'UPDATE_BILLING_INFO', payload: info });
};
