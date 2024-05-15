import React, { useEffect, useState } from "react";
import getOpenAIResponse from "./OpenAiRequest.tsx";
import { Card, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3d5a80',
        },
        secondary: {
            main: '#ee6c4d',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'
        ].join(','),
        h2: {
            color: '#293241',
        },
        h6: {
            color: '#293241',
        },
        body1: {
            color: '#3d5a80',
        },
    },
});

const Feedback: React.FC<{ responses: any[], onFeedbackReady: (feedback: string) => void, onSeeResultClick: () => void }> = ({ responses, onFeedbackReady, onSeeResultClick }) => {
    const [feedback, setFeedback] = useState<string>("Loading feedback...");
    const [loading, setLoading] = useState<boolean>(true);
    const [dialogOpen, setDialogOpen] = useState<boolean>(true);
    const [showFeedback, setShowFeedback] = useState<boolean>(false);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                let specialInstructions = "";

                const dangerResponse = responses.find(response => response.question === "Do you feel in immediate danger and need urgent help?" && response.answer === "Yes");
                if (dangerResponse) {
                    specialInstructions += "Please advise the person to contact their local crisis center immediately at: 123-456-7890. ";
                }

                const digitalStalkingResponse = responses.find(response => response.question.includes("digital platform") && response.answer === "Yes");
                if (digitalStalkingResponse) {
                    specialInstructions += "Provide guidance on securing online accounts and privacy settings. ";
                }

                const systemPrompt = "You are an expert in stalking. You are kind, helpful, and empathetic. Based on the answers you receive, you need to determine if the person is being stalked. If you give recommendations please present them in bullit form. REcommend contacting Danish Stalking Center for specialized support and guidance. provide concise and actionable advice in no more than 200 tokens."

                const prompt = `${specialInstructions}Given the following responses: ${responses.map(r => `${r.question} Answer: ${r.answer}`).join(", ")}, generate supportive and helpful feedback for a victim of stalking.`;

                const result = await getOpenAIResponse([{ role: "system", content: systemPrompt }, { role: "user", content: prompt }]);
                setFeedback(result.choices[0].message.content);
                setLoading(false);
                onFeedbackReady(result.choices[0].message.content);
            } catch (error) {
                console.error("Error fetching feedback:", error);
                setFeedback("Failed to load feedback, please try again later.");
                setLoading(false);
                onFeedbackReady("Failed to load feedback, please try again later.");
            }
        };

        fetchFeedback();
    }, [responses, onFeedbackReady]);

    const handleSeeResult = () => {
        setDialogOpen(false);
        setShowFeedback(true);
        onSeeResultClick();
    };

    return (
        <ThemeProvider theme={theme}>
            <Dialog open={dialogOpen}>
                <DialogTitle style={{ backgroundColor: '#3d5a80', color: '#e0fbfc' }}>Loading Feedback</DialogTitle>
                <DialogContent style={{ backgroundColor: '#e0fbfc' }}>
                    <Typography variant="h6">This test is designed to give an educated guess. On this page, we have created an AI that is specialized in digital security. Based on your answers, it provides feedback and guidance. Feel free to ask additional questions, for instance, how to check which devices have access to your Snapchat account.</Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                        {loading ? <CircularProgress /> : <CheckCircleOutlineIcon style={{ color: 'green', fontSize: 40 }} />}
                    </div>
                </DialogContent>
                <DialogActions style={{ backgroundColor: '#e0fbfc' }}>
                    <Button variant="contained" onClick={handleSeeResult} color="primary" disabled={loading}>
                        See result
                    </Button>
                </DialogActions>
            </Dialog>
            {showFeedback && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h2">Personalized Feedback</Typography>
                    <Card style={{ padding: '20px', marginTop: '10px', backgroundColor: '#e0fbfc', color: '#3d5a80' }}>{feedback}</Card>
                </div>
            )}
        </ThemeProvider>
    );
};

export default Feedback;
