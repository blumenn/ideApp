import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import getOpenAIResponse from "./OpenAiRequest.tsx";

const Chat: React.FC<{ initialMessage: string }> = ({ initialMessage }) => {
    const [messages, setMessages] = useState([{ role: 'system', content: initialMessage }]);
    const [input, setInput] = useState("");

    const handleUserInputSubmit = async (event) => {
        event.preventDefault();
        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        try {
            const result = await getOpenAIResponse([{ role: 'system', content: initialMessage }, ...messages, userMessage]);
            const systemResponse = { role: 'system', content: result.choices[0].message.content };
            setMessages(prev => [...prev, systemResponse]);
        } catch (error) {
            console.error("Error communicating with OpenAI:", error);
            setMessages(prev => [...prev, { role: 'system', content: "Failed to load response, please try again later." }]);
        }
    };

    return (
        <div>
            {messages.map((msg, index) => (
                <Card key={index} style={{ width: "500px", marginBottom: '10px' }}> {/* Added margin for better spacing */}
                    <CardContent>
                        <Typography variant="body1">{msg.role === 'system' ? 'AI: ' : 'You: '}{msg.content}</Typography>
                    </CardContent>
                </Card>
            ))}
            <form onSubmit={handleUserInputSubmit}>
                <TextField
                    fullWidth
                    label="Type your message"
                    variant="outlined"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Send
                </Button>
            </form>
        </div>
    );
};

export default Chat;
