import { expect, describe, it } from '@jest/globals';
import userReducer, {
  initialState,
  registerUser,
  loginUser,
  getUserUser,
  updateUser,
  logoutUser
} from './user';

describe('Тестирование userSlice', () => {
  const mockUser = { email: 'test@test.ru', name: 'Test User' };
  const mockError = 'Ошибка';

  const newState = (action: {
    type: string;
    payload?: {};
    error?: { message: string };
  }) => userReducer(initialState, action);

  it('Начальное состояние соответствует initialState', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('Регистрация: pending', () => {
    const action = { type: registerUser.pending.type };
    const expectedState = {
      ...initialState,
      loading: { ...initialState.loading, register: 'pending' }
    };
    expect(newState(action)).toEqual(expectedState);
  });

  it('Регистрация: fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const expectedState = {
      ...initialState,
      isAuthChecked: true,
      user: mockUser,
      loading: { ...initialState.loading, register: 'fulfilled' }
    };
    expect(newState(action)).toEqual(expectedState);
  });

  it('Регистрация: rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: mockError }
    };
    const expectedState = {
      ...initialState,
      error: mockError,
      loading: { ...initialState.loading, register: 'rejected' }
    };
    expect(newState(action)).toEqual(expectedState);
  });

  it('Вход: fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const expectedState = {
      ...initialState,
      isAuthChecked: true,
      user: mockUser,
      loading: { ...initialState.loading, login: 'fulfilled' }
    };
    expect(newState(action)).toEqual(expectedState);
  });

  it('Получение данных пользователя: fulfilled', () => {
    const action = {
      type: getUserUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const expectedState = {
      ...initialState,
      isAuthChecked: true,
      user: mockUser,
      loading: { ...initialState.loading, getUser: 'fulfilled' }
    };
    expect(newState(action)).toEqual(expectedState);
  });

  it('Обновление данных пользователя: fulfilled', () => {
    const updatedUser = { email: 'updated@test.ru', name: 'Updated User' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser }
    };
    const expectedState = {
      ...initialState,
      user: updatedUser,
      loading: { ...initialState.loading, update: 'fulfilled' }
    };
    expect(newState(action)).toEqual(expectedState);
  });

  it('Выход пользователя: fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    expect(newState(action)).toEqual(initialState);
  });
});
