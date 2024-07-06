import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import {
	createAdvert,
	getAllUserAdverts,
	getUserAdverts,
	setAdvertFree,
} from '../../services/advertService'

// Define the state type
interface AdvertState {
	advert: any | null // Replace 'any' with the actual advert type
	adverts: any[] // Replace 'any' with the actual advert type
	allAdverts: any[] // Replace 'any' with the actual advert type
	isError: boolean
	isSuccess: boolean
	isLoading: boolean
	message: string
}

const initialState: AdvertState = {
	advert: null,
	adverts: [],
	allAdverts: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// Create New Ad
export const createNewAdvert = createAsyncThunk(
	'create/createNewAdvert',
	async ({ adFormData }: { adFormData: any }, thunkAPI) => {
		try {
			return await createAdvert(adFormData)
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

// Toggle Free Ad State
export const handleToggleFreeAdvert = createAsyncThunk(
	'freeAd/adType',
	async ({ id }: { id: string }, thunkAPI) => {
		try {
			return await setAdvertFree(id)
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

// Get User Adverts
export const handleGetUserAdverts = createAsyncThunk(
	'get/handleGetUserAdverts',
	async (_, thunkAPI) => {
		try {
			return await getUserAdverts()
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

// Get All User Adverts
export const handleGetALLUserAdverts = createAsyncThunk(
	'get/handleGetAllUserAdverts',
	async (_, thunkAPI) => {
		try {
			return await getAllUserAdverts()
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},
)

const advertSlice = createSlice({
	name: 'advert',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			// Create New Advert
			.addCase(createNewAdvert.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
			})
			.addCase(
				createNewAdvert.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isError = false
					state.advert = action.payload
					state.adverts.push(action.payload)
					toast.success('Advert Created Successfully')
				},
			)
			.addCase(
				createNewAdvert.rejected,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = false
					state.isError = true
					state.message = action.payload
					toast.error(action.payload)
				},
			)

			// Toggle Free Advert State
			.addCase(handleToggleFreeAdvert.pending, (state) => {
				state.isLoading = true
			})
			.addCase(
				handleToggleFreeAdvert.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isError = false
					state.advert = action.payload
					state.adverts.push(action.payload)
					toast.success('Ad Type Changed')
				},
			)
			.addCase(
				handleToggleFreeAdvert.rejected,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = false
					state.isError = true
					state.message = action.payload
					toast.error(action.payload)
				},
			)

			// Get User Adverts
			.addCase(handleGetUserAdverts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(
				handleGetUserAdverts.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isError = false
					state.adverts = action.payload
				},
			)
			.addCase(
				handleGetUserAdverts.rejected,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = false
					state.isError = true
					state.message = action.payload
					toast.error(action.payload)
				},
			)

			// Get All User Adverts
			.addCase(handleGetALLUserAdverts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(
				handleGetALLUserAdverts.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isError = false
					state.allAdverts = action.payload
				},
			)
			.addCase(
				handleGetALLUserAdverts.rejected,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isSuccess = false
					state.isError = true
					state.message = action.payload
					toast.error(state.message)
				},
			)
	},
})

export const selectAdvert = (state: { advert: AdvertState }) =>
	state.advert.advert
export const selectAdverts = (state: { advert: AdvertState }) =>
	state.advert.adverts
export const selectAllAdverts = (state: { advert: AdvertState }) =>
	state.advert.allAdverts
export const selectIsLoading = (state: { advert: AdvertState }) =>
	state.advert.isLoading
export const selectIsSuccess = (state: { advert: AdvertState }) =>
	state.advert.isSuccess
export const selectIsError = (state: { advert: AdvertState }) =>
	state.advert.isError

export default advertSlice.reducer
