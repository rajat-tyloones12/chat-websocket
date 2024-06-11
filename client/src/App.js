// src/App.js
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import {
  setName,
  setIsLoggedIn,
  addUser,
  removeUser,
  addMessage,
  setCurrentChat,
  resetChat,
} from './store/chatSlice';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './components/Login';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import './App.css';

const client = new W3CWebSocket('ws://localhost:8080');

function App() {
  const { name, isLoggedIn, users, messages, currentChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const messageRef = useRef();

  useEffect(() => {
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case 'USER_CONNECTED':
          if (data.name !== name) {
            dispatch(addUser(data.name));
          }
          break;
        case 'USER_DISCONNECTED':
          dispatch(removeUser(data.name));
          break;
        case 'MESSAGE':
          dispatch(addMessage({ from: data.from, to: data.to, text: data.text }));
          break;
        case 'USER_NOT_FOUND':
          alert(`User ${data.name} not found`);
          break;
        default:
          break;
      }
    };
  }, [name, dispatch]);

  const connect = () => {
    client.send(JSON.stringify({ type: 'CONNECT', name }));
    dispatch(setIsLoggedIn(true));
  };

  const sendMessage = () => {
    const message = messageRef.current.value;
    dispatch(addMessage({ from: name, to: currentChat, text: message }));
    client.send(JSON.stringify({ type: 'MESSAGE', from: name, to: currentChat, text: message }));
    messageRef.current.value = '';
  };

  const disconnect = () => {
    client.send(JSON.stringify({ type: 'DISCONNECT', name }));
    dispatch(resetChat());
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {!isLoggedIn ? (
          <Login name={name} setName={(name) => dispatch(setName(name))} connect={connect} />
        ) : (
          <div className="chat-container">
            <ChatSidebar
              users={users}
              name={name}
              setCurrentChat={(user) => dispatch(setCurrentChat(user))}
              disconnect={disconnect}
            />
            <ChatWindow
              currentChat={currentChat}
              messages={messages}
              name={name}
              sendMessage={sendMessage}
              messageRef={messageRef}
            />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
