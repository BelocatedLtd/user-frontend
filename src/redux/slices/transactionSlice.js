import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserTransactions } from '../../services/transactionService';
import { toast } from 'react-hot-toast';

const initialState = {
    transaction: null,
    transactions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
}

// Get User Adverts
export const handleGetUserTransactions = createAsyncThunk(
    "get/handleGetUserTransactions",
    async(__, thunkAPI) => {
        try {
          return await getUserTransactions()
        } catch(error) {
            const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
        } 
    )

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get User Transactions
      .addCase(handleGetUserTransactions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(handleGetUserTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transactions = action.payload
        toast.success("Trasaction list updated and Retrieved Successfully")
      })
      .addCase(handleGetUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload) 
      })
    }

});

export const {} = transactionSlice.actions
export const selectTransactions = (state) => state.transaction.transactions
export const selectIsLoading = (state) => state.transaction.isLoading;
export const selectIsError = (state) => state.transaction.isError;

export default transactionSlice.reducer