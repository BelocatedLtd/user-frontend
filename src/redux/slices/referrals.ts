import { getAllReferrals } from '@/services/referrals'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { RootState } from '../store'

// Define the shape of the referral state
interface ReferralState {
	referral: any | null
	allReferrals: any[]
	isError: boolean
	isSuccess: boolean
	isLoading: boolean
	message: string
}

// Initial state
const initialState: ReferralState = {
	referral: null,
	allReferrals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// Get all referrals
export const handleGetAllReferrals = createAsyncThunk(
	'referral/handleGetAllReferrals',
	async (_, thunkAPI) => {
		try {
			return await getAllReferrals()
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

const referralSlice = createSlice({
	name: 'referral',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Get all referrals
			.addCase(handleGetAllReferrals.pending, (state) => {
				state.isLoading = true
			})
			.addCase(
				handleGetAllReferrals.fulfilled,
				(state, action: PayloadAction<any[]>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isError = false
					state.allReferrals = action.payload
				},
			)
			.addCase(
				handleGetAllReferrals.rejected,
				(state, action: PayloadAction<any>) => {
					state.isLoading = false
					state.isError = true
					state.message = action.payload
					toast.error(action.payload)
				},
			)
	},
})

// Selectors
export const selectReferral = (state: RootState) => state.referral.referral
export const selectAllReferrals = (state: RootState) =>
	state.referral.allReferrals
export const selectIsLoading = (state: RootState) => state.referral.isLoading
export const selectIsSuccess = (state: RootState) => state.referral.isSuccess
export const selectIsError = (state: RootState) => state.referral.isError

export default referralSlice.reducer
