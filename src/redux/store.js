import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import advertReducer from './slices/advertSlice'
import walletReducer from './slices/walletSlice'
import taskReducer from './slices/taskSlice'
import transactionReducer from './slices/transactionSlice'

const store = configureStore ({
    reducer: {
        auth: authReducer,
        user: userReducer,
        advert: advertReducer,
        wallet: walletReducer,
        task: taskReducer,
        transaction: transactionReducer
    },
})

export default store