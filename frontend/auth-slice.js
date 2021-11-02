import { getIdToken } from '@firebase/auth'
import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null
  },
  reducers: {
    setToken: (state, action) => {
        state.token = action.payload
    },
    logout: (state) => {
      state.token = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken, logout } = authSlice.actions

export const selectToken = state => state.auth.token;


export default authSlice.reducer