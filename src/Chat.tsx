import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getOpenAIResponse from "./OpenAiRequest.tsx";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3d5a80',
        },
        secondary: {
            main: '#ee6c4d',
        },
        background: {
            default: '#e0fbfc',
            paper: '#ffffff',
        },
        text: {
            primary: '#293241',
            secondary: '#3d5a80',
        },
    },
    typography: {
        h6: {
            color: '#293241',
        },
        body1: {
            color: '#3d5a80',
        },
        button: {
            textTransform: 'none',
        },
    },
});

const Chat: React.FC<{ initialMessage: string }> = ({ initialMessage }) => {
    const [messages, setMessages] = useState([{ role: 'system', content: initialMessage }]);
    const [input, setInput] = useState("");

    const handleUserInputSubmit = async (event) => {
        event.preventDefault();
        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        try {
            const result = await getOpenAIResponse([{
                role: 'system',
                content: initialMessage
            }, ...messages, userMessage]);
            const systemResponse = { role: 'system', content: result.choices[0].message.content };
            setMessages(prev => [...prev, systemResponse]);
        } catch (error) {
            console.error("Error communicating with OpenAI:", error);
            setMessages(prev => [...prev, {
                role: 'system',
                content: "Failed to load response, please try again later."
            }]);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" style={{ padding: '20px', marginTop: '50px' }}>
                <Box mb={4} textAlign="center">
                    <Typography variant="h6">
                        This test is designed to give an educated guess. On this page we have created an AI that is specialized in digital security. Based on your answers it provides feedback and guidance. Feel free to ask additional questions, for instance how to check which devices have access to your Snapchat account.
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    {messages.map((msg, index) => (
                        <Card key={index} style={{
                            width: '100%',
                            marginBottom: '10px',
                            textAlign: msg.role === 'system' ? 'start' : 'end',
                            alignSelf: msg.role === 'system' ? 'flex-start' : 'flex-end',
                            backgroundColor: msg.role === 'system' ? '#98c1d9' : '#e0fbfc'
                        }}>
                            <CardContent>
                                <Typography style={{ color: '#293241' }} variant="body1">{msg.content}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                    <form onSubmit={handleUserInputSubmit} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Type your message"
                            variant="outlined"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Send
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Chat;
