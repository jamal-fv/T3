import { useSession, signOut, signIn } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { 
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';

export default function Home() {
  const { data: sessionData } = useSession();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get all emoji posts
  const { data: posts, refetch: refetchPosts } = api.post.getAll.useQuery();
  
  // Create post mutation
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      setInput('');
      void refetchPosts();
    },
    onError: () => {
      setError('Failed to create post');
    }
  });

  // Add this delete post mutation
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      void refetchPosts();
    }
  });

  const handleSubmit = async () => {
    if (!sessionData) {
      setError('Please login to convert and post');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/convert-to-emoji', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });
      
      if (!response.ok) throw new Error('Conversion failed');
      
      const data = await response.json();
      
      await createPost.mutateAsync({
        name: data.result,
        content: input,
         // Store the original input text
      });
    } catch (error: unknown) {
      console.error(error);
      setError('Failed to convert and post');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    void signIn(undefined, { callbackUrl: '/' });
  };

  const handleLogout = () => {
    void signOut();
  };

  return (
    <>
      <Head>
        <title>Emoji Converter</title>
        <meta name="description" content="Convert text to emojis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="md">
        <Box sx={{ minHeight: '100vh', py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography 
              variant="h2" 
              component="h1"
              sx={{ 
                textAlign: 'center',
                background: 'linear-gradient(to right, #2e026d, #15162c)',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Emoji Converter
            </Typography>

            {sessionData && (
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{ 
                  borderColor: '#2e026d',
                  color: '#2e026d',
                  '&:hover': {
                    borderColor: '#15162c',
                    backgroundColor: 'rgba(46, 2, 109, 0.1)',
                  }
                }}
              >
                Logout
              </Button>
            )}
          </Box>

          {sessionData ? (
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                label="Enter your text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!input || loading}
                sx={{ 
                  background: 'linear-gradient(to right, #2e026d, #15162c)',
                  color: 'white'
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                    Converting...
                  </>
                ) : (
                  'Convert & Post'
                )}
              </Button>
            </Paper>
          ) : (
            <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <Alert severity="info" sx={{ width: '100%' }}>
                Please sign in to convert text to emojis
              </Alert>
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{ 
                  background: 'linear-gradient(to right, #2e026d, #15162c)',
                  color: 'white'
                }}
              >
                Go to Login
              </Button>
            </Stack>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {/* Moved outside of authentication check */}
          <Typography variant="h5" sx={{ mb: 3 }}>
            Recent Emoji Posts
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {posts?.map((post) => (
              <Paper key={post.id} elevation={2} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body1">
                      {post.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                      Posted by {post.createdBy.name} on {post.createdAt.toLocaleDateString()}
                    </Typography>
                  </Box>
                  {sessionData?.user?.id === post.createdById && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => void deletePost.mutate({ id: post.id })}
                      sx={{ ml: 2 }}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}
