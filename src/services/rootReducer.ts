import { combineReducers } from 'redux';
import userReducer from './slices/user/user';
import ingredientReducer from './slices/ingredients/ingredients';
import cartReducer from './slices/burger-cart/burger-cart';
import newOrderRequest from './slices/order/new-order';
import orderListReducer from './slices/order/order-list';
import feedsReducer from './slices/feeds/feeds';

const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientReducer,
  cart: cartReducer,
  newOrder: newOrderRequest,
  orderList: orderListReducer,
  feeds: feedsReducer
});

export default rootReducer;
