import feedsReducer, { fetchGetFeed, initialState } from './feeds';

describe('Тестирование feedsSlice', () => {
  const mockFeedsData = {
    orders: [
      {
        _id: '1',
        ingredients: ['ingredient1', 'ingredient2'],
        status: 'done',
        name: 'Test Order 1',
        createdAt: '2023-11-01T10:00:00.000Z',
        updatedAt: '2023-11-01T12:00:00.000Z',
        number: 101
      },
      {
        _id: '2',
        ingredients: ['ingredient3', 'ingredient4'],
        status: 'in progress',
        name: 'Test Order 2',
        createdAt: '2023-11-02T11:00:00.000Z',
        updatedAt: '2023-11-02T13:00:00.000Z',
        number: 102
      }
    ],
    total: 2,
    totalToday: 1
  };

  it('Должен вернуть начальное состояние по умолчанию', () => {
    const state = feedsReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Должен установить loading в true при запросе данных (pending)', () => {
    const action = { type: fetchGetFeed.pending.type };
    const state = feedsReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('Должен успешно обновить данные при получении данных (fulfilled)', () => {
    const action = {
      type: fetchGetFeed.fulfilled.type,
      payload: mockFeedsData
    };
    const state = feedsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.orders).toEqual(mockFeedsData.orders);
    expect(state.total).toBe(mockFeedsData.total);
    expect(state.totalToday).toBe(mockFeedsData.totalToday);
  });

  it('Должен установить ошибку при неудачном запросе данных (rejected)', () => {
    const errorMessage = 'Ошибка при загрузке данных';
    const action = {
      type: fetchGetFeed.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
  });
});
