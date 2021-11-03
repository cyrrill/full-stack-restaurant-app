import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    dishes: {
        // { _id: { name, price, quantity } }
    },
    total: 0,
    quantity: 0
  },
  reducers: {
    addDish: (state, action) => {
        if (!!state.dishes[action.payload._id]) {
            state.dishes[action.payload._id].quantity++
        } else {
            const { name, price } = action.payload
            state.dishes[action.payload._id] = {
                name, price, quantity: 1
            }
        }
        state.total += action.payload.price
        state.quantity++
    },
    removeDish: (state, action) => {
        const existing = state.dishes[action.payload._id]
        if (!!existing) {
            state.dishes[action.payload._id].quantity--
            state.total -= action.payload.price
            state.quantity--
            if (state.dishes[action.payload._id].quantity < 1) {
                delete state.dishes[action.payload._id]
            }
        }
    },
    deleteDish: (state, action) => {
        const existing = state.dishes[action.payload._id]
        if (!!existing) {
            state.quantity -= existing.quantity
            state.total -= existing.quantity * existing.price
            delete state.dishes[action.payload._id]
        }
    },
    emptyCart: (state) => {
        state.dishes = {}
        state.total = 0
        state.quantity = 0
    }
  },
})


export const { addDish, removeDish, deleteDish, emptyCart } = cartSlice.actions
export const selectDishes = state => state.cart.dishes
export const selectTotal = state => state.cart.total
export const selectQuantity = state => state.quantity

export default cartSlice.reducer