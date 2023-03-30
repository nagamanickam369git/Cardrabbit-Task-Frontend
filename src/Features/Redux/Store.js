import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Redux/CreateSclices'

export default configureStore({
    reducer: {
        service: counterReducer,
    },
})