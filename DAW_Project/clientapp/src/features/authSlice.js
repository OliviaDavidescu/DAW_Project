import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    client: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("users/login", async(client, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5193/users/login', {
      UserName: client.username,
      Password: client.parola
    });
    return response.data;
  } catch (error) {
      if(error.response){
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
  }
});

export const MeUser = createAsyncThunk("users/meuser", async(_, thunkAPI) => {
  try {
      const response = await axios.get('http://localhost:5193/users/check-auth-user');
      return response.data;
  } catch (error) {
      if(error.response){
          const message = error.response.data.msg;
          return thunkAPI.rejectWithValue(message);
      }
  }
});

export const LogoutUser = createAsyncThunk("users/logoutuser", async() => {
    await axios.delete('http://localhost:5193/logoutuser');
});



export const LoginAdmin = createAsyncThunk("admins/loginadmin", async(client, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5193/users/login', {
      UserName: client.username,
      Password: client.parola
    });
    return response.data;
  } catch (error) {
      if(error.response){
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
  }
});

export const MeAdmin = createAsyncThunk("admins/meadmin", async(_, thunkAPI) => {
  try {
      const response = await axios.get('http://localhost:5193/users/check-auth-admin');
      return response.data;
  } catch (error) {
      if(error.response){
          const message = error.response.data.msg;
          return thunkAPI.rejectWithValue(message);
      }
  }
});

export const LogoutAdmin = createAsyncThunk("admins/logoutadmin", async() => {
  await axios.delete('http://localhost:5193/logoutadmin');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
      builder.addCase(LoginUser.pending, (state) =>{
        state.isLoading = true;
      });
      builder.addCase(LoginUser.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      });
      builder.addCase(LoginUser.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

      builder.addCase(MeUser.pending, (state) =>{
      state.isLoading = true;
      });
      builder.addCase(MeUser.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      });
      builder.addCase(MeUser.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });


      builder.addCase(LoginAdmin.pending, (state) =>{
        state.isLoading = true;
      });
      builder.addCase(LoginAdmin.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      });
      builder.addCase(LogoutAdmin.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

      builder.addCase(MeAdmin.pending, (state) =>{
      state.isLoading = true;
      });
      builder.addCase(MeAdmin.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      });
      builder.addCase(MeAdmin.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;