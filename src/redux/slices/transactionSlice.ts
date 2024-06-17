import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllTransactions, getUserTransactions } from '../../services/transactionService';
import { toast } from 'react-hot-toast';

interface TransactionState {
  transaction: any | null;
  transactions: any[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message?: string;
}

const initialState: TransactionState = {
  transaction: null,
  transactions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// Get User Transactions
export const handleGetUserTransactions = createAsyncThunk(
  "get/handleGetUserTransactions",
  async (token: string, thunkAPI) => {
    try {
      return await getUserTransactions(token);
    } catch (error: any) {
      const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Transactions
export const handleGetTransactions = createAsyncThunk(
  "get/handleGetTransactions",
  async (token: string, thunkAPI) => {
    try {
      return await getAllTransactions(token);
    } catch (error: any) {
      const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get User Transactions
      .addCase(handleGetUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleGetUserTransactions.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(handleGetUserTransactions.rejected, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Get All Transactions
      .addCase(handleGetTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleGetTransactions.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(handleGetTransactions.rejected, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  }
});

export const selectTransactions = (state: { transaction: TransactionState }) => state.transaction.transactions;
export const selectIsLoading = (state: { transaction: TransactionState }) => state.transaction.isLoading;
export const selectIsError = (state: { transaction: TransactionState }) => state.transaction.isError;

export default transactionSlice.reducer;
