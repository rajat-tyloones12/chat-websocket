// src/store/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    name: '',
    isLoggedIn: false,
    users: {},
    messages: [],
    currentChat: null,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    addUser: (state, action) => {
      const user = action.payload;
      state.users[user] = true;  // User is connected
    },
    removeUser: (state, action) => {
      const user = action.payload;
      if (state.users[user]) {
        state.users[user] = false;  // User is disconnected
      }
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    resetChat: (state) => {
      state.isLoggedIn = false;
      state.currentChat = null;
      state.messages = [];
    },
  },
});

export const { setName, setIsLoggedIn, addUser, removeUser, addMessage, setCurrentChat, resetChat } = chatSlice.actions;

export default chatSlice.reducer;
