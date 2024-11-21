import { expect, test, describe } from '@jest/globals';
import newOrderReducer, {
  initialState,
  getNewOrder,
  clearOrder
} from './new-order';

describe('Тестирование newOrderSlice', () => {
  const mockOrder = {
    _id: '123',
    ingredients: ['1', '2', '3'],
    status: 'done',
    name: 'Test Burger',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-02',
    number: 456
  };

  const mockResponse = {
    order: mockOrder,
    name: 'Test Burger'
  };

  it('Должен вернуть начальное состояние', () => {
    expect(newOrderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('Должен обработать состояние pending', () => {
    const action = { type: getNewOrder.pending.type };
    const expectedState = { ...initialState, orderRequest: true };

    const newState = newOrderReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('Должен обработать состояние fulfilled', () => {
    const action = {
      type: getNewOrder.fulfilled.type,
      payload: mockResponse
    };

    const expectedState = {
      ...initialState,
      orderRequest: false,
      order: mockResponse.order,
      name: mockResponse.name
    };

    const newState = newOrderReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('Должен обработать состояние rejected', () => {
    const action = {
      type: getNewOrder.rejected.type,
      error: { message: 'Ошибка запроса' }
    };

    const expectedState = {
      ...initialState,
      orderRequest: false
    };

    const newState = newOrderReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('Должен обработать clearOrder', () => {
    const modifiedState = {
      order: mockOrder,
      name: 'Test Burger',
      orderRequest: false
    };

    const action = clearOrder();
    const newState = newOrderReducer(modifiedState, action);

    expect(newState).toEqual(initialState);
  });
});
