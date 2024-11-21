import ingredientsReducer, {
    initialState,
    fetchIngredients
  } from './ingredients';
  
  describe('Тестирование ingredientsSlice', () => {
    const mockIngredients = [
      {
        _id: '1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://example.com/bun1.png',
        image_mobile: 'https://example.com/bun1_mobile.png',
        image_large: 'https://example.com/bun1_large.png'
      },
      {
        _id: '2',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://example.com/sauce.png',
        image_mobile: 'https://example.com/sauce_mobile.png',
        image_large: 'https://example.com/sauce_large.png'
      }
    ];
  
    it('Должен вернуть начальное состояние', () => {
      expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
    });
  
    it('Должен обработать pending состояние', () => {
      const action = { type: fetchIngredients.pending.type };
      const expectedState = { ...initialState, loading: true, error: null };
  
      const newState = ingredientsReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    it('Должен обработать fulfilled состояние', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const expectedState = {
        ...initialState,
        ingredients: mockIngredients,
        loading: false
      };
  
      const newState = ingredientsReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    it('Должен обработать rejected состояние', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: 'Ошибка загрузки' }
      };
      const expectedState = {
        ...initialState,
        loading: false,
        error: 'Ошибка загрузки'
      };
  
      const newState = ingredientsReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
  