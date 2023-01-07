import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(id) {
            return null
        }
    }
})
// variable to hold timeout id for clearing the notification always after 5 seconds 
let timeoutId 

export const createNotification = (message, time, type) => {
    return (dispatch, getState) => {
        // Clear previous timeouts
        clearTimeout(timeoutId)
        // Set new notification
        dispatch(setNotification({message, type}))
        // Set timeout to clear new notification
        timeoutId = setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer