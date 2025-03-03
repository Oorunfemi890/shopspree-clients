
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,       
  isLoggedIn: false,    
  error: null,          
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;  
      state.isLoggedIn = true;          
      state.error = null;               
    },
    logout: (state) => {
      state.userInfo = null;            
      state.isLoggedIn = false;          
      state.error = null;               
    },
    loginFailure: (state, action) => {
      state.error = action.payload;      
      state.isLoggedIn = false;          
    },
  },
});

export const { setUser, logout, loginFailure } = userSlice.actions;

export default userSlice.reducer;
