import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

describe('rootReducer Initialization', () => {
  it('should initialize the state with default values', () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();
    expect(rootReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });
});
