import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { updateUser } from '../../services/authServices';
import { toast } from 'react-hot-toast';

//const username = JSON.parse(localStorage.getItem("username"))

const initialState = {
    isLoggedIn: false,
   // username: username ? username : "",
    username: "",
    user: {
        id: "",
        username: "",
        fullname: "",
        email: "",
        phone: null,
        location: "",
        religion: "",
        gender: "",
        community: "",
        walletId: "",
        accountType: "",
        token: ""
    },
    walletId: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
}

//Update User
export const handleUpdateUser = createAsyncThunk(
    'auth/handleUpdateUser',
    async (formData, thunkAPI) =>
    {
        try {
            return await updateUser(formData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
        state.isLoggedIn = action.payload
    },
    SET_USERNAME(state, action) {
        localStorage.setItem("username", JSON.stringify(action.payload))
        state.username = action.payload
    },
    SET_USER_WALLET(state, action) {
        state.walletId = action.payload
    },
    SET_USER(state, action) {
        const profile = action.payload
        state.user.id = profile._id
        state.user.fullname = profile.fullname
        state.user.username = profile.username
        state.user.email = profile.email
        state.user.phone = profile.phone
        state.user.location = profile.location
        state.user.religion = profile.religion
        state.user.community = profile.community
        state.user.gender = profile.gender
        state.user.walletId = profile.walletId 
        state.user.accountType = profile.accountType
        state.user.token = profile.token
    },
    // SET_LOGOUT(state) {
    //     state.username = ""
    //     state.user.id = ""
    //     state.user.fullname = ""
    //     state.user.username = ""
    //     state.user.email = ""
    //     state.user.phone = ""
    //     state.user.location = ""
    //     state.user.religion = ""
    //     state.user.community = ""
    //     state.user.gender = ""
    //     state.user.token = ""
    // },
  },
  extraReducers: (builder) => {
    builder

    //Update User
    .addCase(handleUpdateUser.pending, (state) => {
        state.isLoading = true
    })
    .addCase(handleUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      
        const profile = action.payload
        state.user.fullname = profile.fullname
        state.user.username = profile.username
        state.user.email = profile.email
        state.user.phone = profile.phone
        state.user.location = profile.location
        state.user.religion = profile.religion
        state.user.community = profile.community
        state.user.gender = profile.gender
        toast.success('User Detailed Updated!')
    })
    .addCase(handleUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('Failed to Update User details')
    })
  }
});


export const {SET_LOGIN, SET_USERNAME, SET_USER_WALLET, SET_USER} = authSlice.actions
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUser = (state) => state.auth.user
export const selectUserId = (state) => state.auth?.user?.id
export const selectUsername = (state) => state.auth.username

export default authSlice.reducer