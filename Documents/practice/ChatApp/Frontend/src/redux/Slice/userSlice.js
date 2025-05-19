import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogout: false,
  isLogin: false,
  receiver: null,
  socketInstance: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setLogout: (state, action) => {
      state.isLogout = action.payload;
    },
    setReceiver: (state, action) => {
      state.receiver = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setLogin, setLogout, setReceiver } = userSlice.actions;

export default userSlice.reducer;
