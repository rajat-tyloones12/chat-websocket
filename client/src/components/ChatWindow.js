import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function ChatWindow({ currentChat, messages, name, sendMessage, messageRef }) {
  return (
    <Box width="80%" p={2} display="flex" flexDirection="column" bgcolor="background.paper">
      {currentChat ? (
        <>
          <Typography variant="h4" component="h3" gutterBottom sx={{ textAlign: 'center', color: 'primary.main' }}>
            Chat with {currentChat}
          </Typography>
          <Box flex={1} overflow="auto" sx={{ mb: 2 }}>
            <List>
              {messages
                .filter((msg) => msg.from === currentChat || msg.to === currentChat) // Filter messages based on currentChat
                .map((msg, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      justifyContent: msg.from === name ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <ListItemText
                      primary={msg.text}
                      sx={{
                        backgroundColor: msg.from === name ? 'senderMessage.main' : 'recipientMessage.main',
                        borderRadius: 1,
                        p: 1,
                        maxWidth: '70%',
                        textAlign: msg.from === name ? 'right' : 'left',
                        color: 'text.primary',
                      }}
                    />
                  </ListItem>
                ))}
            </List>
          </Box>
          <Box display="flex">
            <TextField
              variant="outlined"
              placeholder="Type a message"
              inputRef={messageRef}
              fullWidth
              sx={{ backgroundColor: 'background.default', color: 'text.primary' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => sendMessage(currentChat)} // Send message to currentChat
              endIcon={<SendIcon />}
              sx={{ ml: 2 }}
            >
              Send
            </Button>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          color="text.secondary"
        >
          <AddCircleOutlineIcon sx={{ fontSize: 60, mb: 2, color: 'text.secondary' }} />
          <Typography variant="h5">No user selected</Typography>
          <Typography variant="body1">Please select a user to start chatting</Typography>
        
        </Box>
      )}
    </Box>
  );
}

export default ChatWindow;
