import { expect, describe } from '@jest/globals';
import orderListReducer, { initialState, getOrderList, clearOrderList } from './order-list';

describe('Тестирование orderListSlice', () => {
  const mockOrders = [
    {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Order 1',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      number: 1
    },
    {
      _id: '2',
      ingredients: ['3', '4'],
      status: 'done',
      name: 'Order 2',
      createdAt: '2023-01-03',
      updatedAt: '2023-01-04',
      number: 2
    }
  ];

  it('Должен вернуть начальное состояние', () => {
    expect(orderListReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('Должен обработать состояние pending', () => {
    const action = { type: getOrderList.pending.type };
    const expectedState = { ...initialState, isLoading: true, error: null };

    const newState = orderListReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('Должен обработать состояние fulfilled', () => {
    const action = {
      type: getOrderList.fulfilled.type,
      payload: mockOrders
    };
    const expectedState = { ...initialState, isLoading: false, orders: mockOrders };

    const newState = orderListReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('Должен обработать состояние rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = { type: getOrderList.rejected.type, payload: errorMessage };
    const expectedState = { ...initialState, isLoading: false, error: errorMessage };

    const newState = orderListReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('Должен очистить список заказов при вызове clearOrderList', () => {
    const modifiedState = { orders: mockOrders, isLoading: false, error: null };
    const action = clearOrderList();
    const newState = orderListReducer(modifiedState, action);

    expect(newState).toEqual(initialState);
  });
});
