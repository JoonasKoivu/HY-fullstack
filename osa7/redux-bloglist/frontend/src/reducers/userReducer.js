import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice ({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearUser(state, action) {
            return null
        },
        setUsers(state, action) {
            return state.users = action.payload
        }
    }
})

export const login = (user) => {
    return async dispatch => {
        await userService.setUser(user)
        dispatch(setUser(user))
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch(clearUser())
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}


export default userSlice.reducer
export const { setUser, clearUser, setUsers } = userSlice.actions