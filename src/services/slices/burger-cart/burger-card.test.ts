import cartReducer, {
    addBurgerBun,
    addIngredient,
    removeIngredient,
    moveIngredientUp,
    moveIngredientDown,
    clearBurgerCart,
    initialState
  } from './burger-cart';
  
  describe('burger-cart reducer', () => {
    const bun = {
      calories: 200,
      carbohydrates: 30,
      fat: 10,
      id: 'testBunId',
      image: 'testBunImage',
      image_large: 'testBunImageLarge',
      image_mobile: 'testBunImageMobile',
      name: 'Test Bun',
      price: 100,
      proteins: 50,
      type: 'bun',
      __v: 0,
      _id: 'testBunId'
    };
  
    const ingredient = {
      calories: 300,
      carbohydrates: 40,
      fat: 20,
      id: 'testIngredientId',
      image: 'testIngredientImage',
      image_large: 'testIngredientImageLarge',
      image_mobile: 'testIngredientImageMobile',
      name: 'Test Ingredient',
      price: 200,
      proteins: 60,
      type: 'main',
      __v: 0,
      _id: 'testIngredientId'
    };
  
    it('should return the initial state', () => {
      expect(cartReducer(undefined, { type: '' })).toEqual(initialState);
    });
  
    it('should handle adding a bun', () => {
      const newState = cartReducer(initialState, addBurgerBun(bun));
      expect(newState.bun).toEqual(bun);
    });
  
    it('should handle adding an ingredient', () => {
      const newState = cartReducer(initialState, addIngredient(ingredient));
      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]).toEqual(ingredient);
    });
  
    it('should handle removing an ingredient', () => {
      const stateWithIngredient = {
        ...initialState,
        ingredients: [ingredient]
      };
  
      const newState = cartReducer(stateWithIngredient, removeIngredient(0));
      expect(newState.ingredients).toHaveLength(0);
    });
  
    it('should handle moving an ingredient up', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [ingredient, { ...ingredient, id: 'testIngredient2' }]
      };
  
      const newState = cartReducer(stateWithIngredients, moveIngredientUp(1));
      expect(newState.ingredients).toEqual([
        { ...ingredient, id: 'testIngredient2' },
        ingredient
      ]);
    });
  
    it('should handle moving an ingredient down', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [ingredient, { ...ingredient, id: 'testIngredient2' }]
      };
  
      const newState = cartReducer(stateWithIngredients, moveIngredientDown(0));
      expect(newState.ingredients).toEqual([
        { ...ingredient, id: 'testIngredient2' },
        ingredient
      ]);
    });
  
    it('should handle clearing the cart', () => {
      const stateWithData = {
        bun: bun,
        ingredients: [ingredient]
      };
  
      const newState = cartReducer(stateWithData, clearBurgerCart());
      expect(newState).toEqual(initialState);
    });
  });
  