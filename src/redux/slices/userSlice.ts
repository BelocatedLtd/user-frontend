import { createSlice } from '@reduxjs/toolkit'
// import { getAllUser } from '../../services/userServices'

const initialState = {
	user: {},
	users: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: '',
}

// Get All Users
// export const handleGetAllUser = createAsyncThunk(
// 	'get/handleGetAllUser',
// 	async (__, thunkAPI) => {
// 		try {
// 			return await getAllUser()
// 		} catch (error: any) {
// 			const message =
// 				(error.response &&
// 					error.response.data &&
// 					error.response.data.message) ||
// 				error.message ||
// 				error.toString()
// 			return thunkAPI.rejectWithValue(message)
// 		}
// 	},
// )

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

		//Update User
		// .addCase(handleGetAllUser.pending, (state) => {
		// 	state.isLoading = true
		// })
		// .addCase(handleGetAllUser.fulfilled, (state, action) => {
		// 	state.isLoading = false
		// 	state.isSuccess = true
		// 	state.isError = false
		// 	state.users = action.payload
		// })
		// .addCase(handleGetAllUser.rejected, (state, action: any) => {
		// 	state.isLoading = false
		// 	state.isSuccess = false
		// 	state.isError = true
		// 	state.message = action.payload
		// 	toast.error('Failed to Get Users')
		// })
	},
})

export const selectUser = (state: { user: { user: any } }) => state.user
export const selectUsers = (state: { user: any }) => state.user.users

export const selectIsLoading = (state: { user: { isLoading: boolean } }) =>
	state.user.isLoading
export const selectIsError = (state: { user: { isError: boolean } }) =>
	state.user.isError

export default userSlice.reducer
