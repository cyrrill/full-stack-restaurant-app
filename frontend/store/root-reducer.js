import { combineReducers } from 'redux'
import authReducer from './auth-slice'
import cartReducer from './cart-slice'

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
})

export default rootReducer