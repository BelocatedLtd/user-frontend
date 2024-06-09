import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import advertReducer from './slices/advertSlice'
import walletReducer from './slices/walletSlice'
import taskReducer from './slices/taskSlice'
import transactionReducer from './slices/transactionSlice'
import feedReducer from './slices/feedSlice'
import refChallengeReducer from './slices/refChallSlice'

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	advert: advertReducer,
	wallet: walletReducer,
	task: taskReducer,
	transaction: transactionReducer,
	feed: feedReducer,
	refChallenge: refChallengeReducer,
})

export default rootReducer
