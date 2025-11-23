import { createSlice } from "@reduxjs/toolkit";

const savedAuth = JSON.parse(localStorage.getItem("authState"));

const initialState = {
  user: savedAuth?.user || null,
  accessToken: savedAuth?.accessToken || null,
  loading: false,
  error: null,
};

const saveToLocalStorage = (state) => {
  localStorage.setItem(
    "authState",
    JSON.stringify({
      user: state.user,
      accessToken: state.accessToken,
    })
  );
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      saveToLocalStorage(state);
    },

    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      localStorage.removeItem("authState");
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
