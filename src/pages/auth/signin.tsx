import { signIn } from "next-auth/react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";

export default function SignIn() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1">
            Sign In
          </Typography>

          <Button
            variant="contained"
            onClick={() => void signIn("discord")}
            sx={{
              background: 'linear-gradient(to right, #2e026d, #15162c)',
              color: 'white',
              width: '100%',
            }}
          >
            Sign in with Discord
          </Button>

          <Button
            variant="contained"
            onClick={() => void signIn("google")}
            sx={{
              background: 'linear-gradient(to right, #2e026d, #15162c)',
              color: 'white',
              width: '100%',
            }}
          >
            Sign in with Google
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
