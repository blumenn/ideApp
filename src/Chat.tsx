import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getOpenAIResponse from "./OpenAiRequest.tsx";
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';

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
            const systemResponse = { role: 'system', content: (result.choices[0].message.content) };
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
                <Box display="flex" flexDirection="column" alignItems="center">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            style={{
                                width: '100%',
                                marginBottom: '10px',
                                textAlign: msg.role === 'system' ? 'start' : 'end',
                                alignSelf: msg.role === 'system' ? 'flex-start' : 'flex-end',
                            }}
                        >
                            <Card style={{
                                backgroundColor: msg.role === 'system' ? '#98c1d9' : '#e0fbfc'
                            }}>
                                <CardContent>
                                    <Typography style={{ color: '#293241' }} variant="body1">
                                        <ReactMarkdown components={{
                                            p: ({ node, ...props }) => <p style={{ color: '#293241' }} {...props} />,
                                            ul: ({ node, ...props }) => <ul style={{ color: '#293241' }} {...props} />,
                                            li: ({ node, ...props }) => <li style={{ color: '#293241' }} {...props} />
                                        }}>
                                            {msg.content}
                                        </ReactMarkdown>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                    <form onSubmit={handleUserInputSubmit} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Feel free to ask a question"
                            variant="outlined"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            margin="normal"
                            style={{backgroundColor: '#e0fbfc'}}
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
