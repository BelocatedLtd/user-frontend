import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import {
	confirmWithdrawal,
	deleteWithdrawal,
	fundWallet,
	getUserWithdrawals,
	getWallet,
	getWithdrawals,
	initTransaction,
	withdrawWallet,
} from '../../services/walletServices'

// Define the shape of the wallet state
interface WalletState {
	walletValue: {
		userId: string
		value: null | number
		totalEarning: null | number
		pendingBalance: null | number
		amountSpent: null | number
	}
	wallets: never[]
	transaction: null
	transactions: never[]
	withdraw: null
	withdrawals: any[]
	isError: boolean
	isSuccess: boolean
	isLoading: boolean
	message: string // Add message property
}

// Initial state
const initialState: WalletState = {
	walletValue: {
		userId: '',
		value: null,
		totalEarning: null,
		pendingBalance: null,
		amountSpent: null,
	},
	wallets: [],
	transaction: null,
	transactions: [],
	withdraw: null,
	withdrawals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '', // Initialize message property
}

// Get User Wallet
export const getUserWallet = createAsyncThunk(
	'wallet/handleGetUserWallet',
	async (_, thunkAPI) => {
		try {
			return await getWallet()
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

// Fund User Wallet
export const fundUserWallet = createAsyncThunk<
	ReturnType<typeof fundWallet>,
	any,
	{ rejectValue: string }
>('wallet/handleFundUserWallet', async (trxData, thunkAPI) => {
	try {
		return await fundWallet(trxData)
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

// Initialize User Transaction
export const handleInitializeUserTransaction = createAsyncThunk<
	ReturnType<typeof initTransaction>,
	any,
	{ rejectValue: string }
>('wallet/handleInitializeUserTransaction', async (trxData, thunkAPI) => {
	try {
		return await initTransaction(trxData)
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		console.log('🚀 ~ > handleInitializeUserTransaction~ message:', message)

		return thunkAPI.rejectWithValue(message)
	}
})

// Withdraw User Wallet
export const withdrawUserWallet = createAsyncThunk(
	'wallet/withdrawUserWallet',
	async (confirmedWithdrawalDetails: any, thunkAPI) => {
		try {
			const response = await withdrawWallet(confirmedWithdrawalDetails)
			return response.data
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

// Get All Users Withdrawals
export const handleGetWithdrawals = createAsyncThunk(
	'wallet/handleAllUserWithdrawals',
	async (_, thunkAPI) => {
		try {
			return await getWithdrawals()
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

// Get User Withdrawals
export const handleGetUserWithdrawals = createAsyncThunk(
	'wallet/handlegetUserWithdrawals',
	async (userId: string, thunkAPI) => {
		try {
			return await getUserWithdrawals(userId)
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

// Confirm Withdraw User Wallet
export const handleConfirmUserWithdrawal = createAsyncThunk(
	'wallet/handleConfirmUserWithdrawal',
	async (withdrawalRequestId: string, thunkAPI) => {
		try {
			return await confirmWithdrawal(withdrawalRequestId)
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

// Delete Withdrawal
export const handleDeleteWithdrawal = createAsyncThunk(
	'wallet/handleDeleteWithdrawal',
	async (withdrawalRequestId: string, thunkAPI) => {
		try {
			return await deleteWithdrawal(withdrawalRequestId)
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

const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Get User Wallet
			.addCase(getUserWallet.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getUserWallet.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.walletValue = action.payload
			})
			.addCase(getUserWallet.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error(action.payload as string)
			})

			// Fund User Wallet
			.addCase(fundUserWallet.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fundUserWallet.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.walletValue = action.payload as any
			})
			.addCase(fundUserWallet.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error(action.payload as string)
			})

			// Initialize User Transaction
			.addCase(handleInitializeUserTransaction.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleInitializeUserTransaction.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.transaction = action.payload as any
			})
			.addCase(handleInitializeUserTransaction.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error(action.payload as string)
			})

			// Withdraw User Wallet
			.addCase(withdrawUserWallet.pending, (state) => {
				state.isLoading = true
			})
			.addCase(withdrawUserWallet.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.walletValue = action.payload
				toast.success('Withdrawal request sent successfully')
			})
			.addCase(withdrawUserWallet.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error(action.payload as string)
			})

			// Get All Users Withdrawals
			.addCase(handleGetWithdrawals.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleGetWithdrawals.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.withdrawals = action.payload
			})
			.addCase(handleGetWithdrawals.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error(action.payload as string)
			})

			// Get User Withdrawals
			.addCase(handleGetUserWithdrawals.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleGetUserWithdrawals.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.withdrawals = action.payload
			})
			.addCase(handleGetUserWithdrawals.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error(action.payload as string)
			})

			// Confirm Withdraw User Wallet
			.addCase(handleConfirmUserWithdrawal.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleConfirmUserWithdrawal.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.withdraw = action.payload
				state.withdrawals.push(action.payload)
				toast.success('Withdrawal Approved Successfully')
			})
			.addCase(handleConfirmUserWithdrawal.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error(action.payload as string)
			})

			// Delete Withdrawal
			.addCase(handleDeleteWithdrawal.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleDeleteWithdrawal.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.isError = false
				state.withdrawals = action.payload
			})
			.addCase(handleDeleteWithdrawal.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				toast.error(action.payload as string)
			})
	},
})

export const {} = walletSlice.actions

export const selectUserWallet = (state: { wallet: WalletState }) =>
	state.wallet.walletValue

export const selectWithdrawals = (state: { wallet: WalletState }) =>
	state.wallet.withdrawals

export const selectIsLoading = (state: { wallet: WalletState }) =>
	state.wallet.isLoading

export const selectIsError = (state: { wallet: WalletState }) =>
	state.wallet.isError

export const selectIsSuccess = (state: { wallet: WalletState }) =>
	state.wallet.isSuccess

export default walletSlice.reducer
