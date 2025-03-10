import { createSlice } from '@reduxjs/toolkit'
import { removeTokenToLocalStorage, setTokenToLocalStorage } from '../../helpers/localstorage.helper'


/**
 * @typedef {Object} UserState
 * @property {UserData | null} userData
 * @property {string | null} accessToken
 * @property {boolean} isAuth
 */

/** @type {UserState} */
const initialState = {
    userData: null,
    accessToken: null,
    isAuth: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action) => {
        state.userData = action.payload
        state.isAuth = true
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      setTokenToLocalStorage('accessToken', state.accessToken)
    },
    logoutAction: (state) => {
        state.isAuth = false
        state.userData = null
        state.accessToken = null
        removeTokenToLocalStorage('accessToken')
    }
  },
})

export const { loginAction, logoutAction, setAccessToken } = userSlice.actions
export default userSlice.reducer