import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateUser } from '../../services/authServices'
import { toast } from 'react-hot-toast'

// Utility function to check if we're running on the client side
const isBrowser = typeof window !== 'undefined'

const initialState = {
	isLoggedIn: false,
	user: null as any,
	username: '',
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: '',
}

// Update User
export const handleUpdateUser = createAsyncThunk(
	'auth/handleUpdateUser',
	async (formData: any, thunkAPI) => {
		try {
			return await updateUser(formData)
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			console.log(message)
			return thunkAPI.rejectWithValue(message)
		}
	},
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		SET_USER: (state, action: PayloadAction<any>) => {
			state.user = action.payload
			if (isBrowser) {
				localStorage.setItem('user', JSON.stringify(action.payload))
			}
		},
		SET_LOGIN(state) {
			state.isLoggedIn = true
		},
		SET_USERNAME(state, action: PayloadAction<string>) {
			state.username = action.payload
		},
		SET_USER_WALLET(state, action: PayloadAction<string>) {
			state.user.walletId = action.payload
		},
		SET_LOGOUT(state) {
			state.user = null
			state.isLoggedIn = false
			if (isBrowser) {
				localStorage.removeItem('user')
				localStorage.removeItem('token')
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// Update User
			.addCase(handleUpdateUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleUpdateUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false

				const profile = action.payload
				state.user = {
					...state.user,
					fullname: profile.fullname,
					username: profile.username,
					email: profile.email,
					phone: profile.phone,
					location: profile.location,
					religion: profile.religion,
					community: profile.community,
					gender: profile.gender,
				}
				toast.success('User Details Updated!')
			})
			.addCase(handleUpdateUser.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error('Failed to Update User details')
			})
	},
})

export const {
	SET_LOGIN,
	SET_USER_WALLET,
	SET_USER,
	SET_LOGOUT,
	SET_USERNAME,
} = authSlice.actions

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn
export const selectUser = (state: any) => state.auth.user
export const selectUsername = (state: any) => state.auth.username
export const selectUserId = (state: any) => state.auth?.user?._id

export default authSlice.reducer
