import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice'
import cartReducer from './cart-slice'

export default configureStore({
  reducer: {
      auth: authReducer,
      cart: cartReducer,
  },
})