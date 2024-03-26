import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';
import { getAllChallenges } from '../../services/refService';

const initialState = {
    challenge: null,
    allChallenges: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "" 
  }

  // Get All Ref Challenges
export const handleGetAllChallenges = createAsyncThunk(
    "get/handleGetChallenges",
    async(__, thunkAPI) => {
        try {
          return await getAllChallenges()
        } catch(error) {
            const message = 
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
        } 
    )

    const refChallSlice = createSlice({
        name: 'challenge',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder

            // Get All Challenges
            .addCase(handleGetAllChallenges.pending, (state) => {
                state.isLoading = true
            })
            .addCase(handleGetAllChallenges.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.allChallenges = action.payload
            })
            .addCase(handleGetAllChallenges.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload) 
            })
        }
    });

export const {} = refChallSlice.actions
export const selectChallenge = (state) => state.challenge.challenge
export const selectallChallenges = (state) => state.challenge.allChallenges
export const selectIsLoading = (state) => state.challenge.isLoading;
export const selectIsSuccess = (state) => state.challenge.isSuccess;
export const selectIsError = (state) => state.challenge.isError;



export default refChallSlice.reducer