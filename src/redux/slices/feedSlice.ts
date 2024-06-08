import { createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit'
import { getAllActivities } from '../../services/feedService'
import { toast } from 'react-hot-toast'

interface FeedState {
	activity: any
	activities: any[]
	isError: boolean
	isSuccess: boolean
	isLoading: boolean
	message?: string // Add the message property here
}

const initialState: FeedState = {
	activity: null,
	activities: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
}

export const handleGetAllActivities: AsyncThunk<any, void, {}> =
	createAsyncThunk('get/handleGetAllActivities', async (_, thunkAPI) => {
		try {
			return await getAllActivities()
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message as string) // Type assertion here
		}
	})

export const handleGetActivity: AsyncThunk<any, void, {}> = createAsyncThunk(
	'get/handleGetActivity',
	async (_, thunkAPI) => {
		try {
			// return await getActivity();
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message as string) // Type assertion here
		}
	},
)

const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		NEW_ACTIVITY(state, action) {
			state.activity = action.payload
			state.activities.push(action.payload)
		},
	},
	extraReducers: (builder) => {
		builder
			// Get All Activities
			.addCase(handleGetAllActivities.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleGetAllActivities.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.activities = action.payload
			})
			.addCase(handleGetAllActivities.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error(action.payload as string)
			})

			// Get Activity
			.addCase(handleGetActivity.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleGetActivity.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.activity = action.payload
				state.activities.push(action.payload)
			})
			.addCase(handleGetActivity.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error(action.payload as string)
			})
	},
})

export const { NEW_ACTIVITY } = feedSlice.actions
export const selectActivities = (state: any) => state.feed.activities
export const selectIsLoading = (state: any) => state.feed.isLoading
export const selectIsError = (state: any) => state.feed.isError

export default feedSlice.reducer
