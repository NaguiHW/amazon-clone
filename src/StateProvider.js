import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

StateProvider.propTypes = {
  reducer: PropTypes.oneOfType([PropTypes.any]).isRequired,
  initialState: PropTypes.oneOfType([PropTypes.any]).isRequired,
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export const useStateValue = () => useContext(StateContext);
