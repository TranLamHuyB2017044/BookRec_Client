import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    newUser: null,
  },
  reducers: {
    SignIn: (state, action) => {
      state.currentUser = action.payload;
    },

    Exit: (state) =>{
      state.currentUser = null;
    },
    SignUp: (state, action) =>{
      state.newUser = action.payload;
    },
    updateCurrentUser: (state, action) =>{
      state.currentUser = action.payload;
    }
  }
})

export const { SignIn, Exit, SignUp, updateCurrentUser} = userSlice.actions;
export default userSlice.reducer;