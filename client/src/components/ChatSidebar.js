import React from 'react';
import { Box, List, Button, Typography, Divider, Card, CardContent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function ChatSidebar({ users, name, currentChat, setCurrentChat, disconnect }) {
  return (
    <Box width="20%" bgcolor="primary.light" p={2} boxShadow={3} height="100%" overflow="auto">
      <Box height="calc(100% - 60px)" overflow="auto">
        <Typography variant="h6" component="h3" gutterBottom>
          Users
        </Typography>
        <Divider />
        <List>
          {Object.keys(users)
            .filter((user) => user !== name)
            .map((user) => (
              <Card
                key={user}
                variant="outlined"
                sx={{
                  mb: 1,
                  bgcolor: currentChat === user ? 'secondary.main' : 'inherit',
                  color: currentChat === user ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: currentChat === user ? 'secondary.main' : 'action.hover',
                  },
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentChat(user)}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                  <PersonIcon sx={{ color: currentChat === user ? 'white' : 'action.active' }} />
                  <Box ml={1}>
                    <Typography variant="body2" sx={{ color: currentChat === user ? 'white' : 'text.primary' }}>
                      {user}
                    </Typography>
                    {users[user] && (
                      <Typography variant="caption" sx={{ color: currentChat === user ? 'white' : 'text.secondary' }}>
                        Connected
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
        </List>
      </Box>
      <Divider />
      <Box mt="auto">
        <Button
          variant="contained"
          color="secondary"
          onClick={disconnect}
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          Disconnect
        </Button>
      </Box>
    </Box>
  );
}

export default ChatSidebar;
