"use client"
import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Initial state for the cart
const initialState = {
  cart: null,
  billing: {
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    email: "",
    phone: "",
    birthday: ""
  },
  shipping: {
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: ""
  },
};

// Reducer function to manage cart state
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: action.payload,
      };
    case 'UPDATE_BILLING_INFO':
      return {
        ...state,
        billing: { ...state.billing, ...action.payload },
      };
    case 'UPDATE_SHIPPING_INFO':
      return {
        ...state,
        shipping: { ...state.shipping, ...action.payload.shipping },
        billing:{ ...state.billing, ...action.payload.billing }
      };
    default:
      return state;
  }
};

// Helper function to load state from localStorage
const loadStateFromLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedState = localStorage.getItem('storeState');
    return savedState ? JSON.parse(savedState) : initialState;
  }
  return initialState;
};

// Create context
const StoreContext = createContext();

// Custom hook to use the store
export const useStore = () => {
  return useContext(StoreContext);
};

// Store provider component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadStateFromLocalStorage());

  // Persist state to localStorage on state change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('storeState', JSON.stringify(state));
    }
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
