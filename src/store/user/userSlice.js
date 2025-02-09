import { createSlice } from '@reduxjs/toolkit'

/**
 * @typedef {Object} UserState
 * @property {UserData | null} userData
 * @property {boolean} isAuth
 */

/** @type {UserState} */
const initialState = {
    userData: null,
    isAuth: false, 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action) => {
        state.userData = action.payload
        state.isAuth = true
    },
    logoutAction: (state) => {
        state.isAuth = false
        state.userData = null
    }
  },
})


export const { loginAction, logoutAction } = userSlice.actions

export default userSlice.reducer