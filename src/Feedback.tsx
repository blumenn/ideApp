import React, { useEffect, useState } from "react";
import getOpenAIResponse from "./OpenAiRequest.tsx";
import Card from "@mui/material/Card";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Feedback: React.FC<{ responses: any[], onFeedbackReady: (feedback: string) => void, onSeeResultClick: () => void }> = ({ responses, onFeedbackReady, onSeeResultClick }) => {
    const [feedback, setFeedback] = useState<string>("Loading feedback...");
    const [loading, setLoading] = useState<boolean>(true);
    const [dialogOpen, setDialogOpen] = useState<boolean>(true);
    const [showFeedback, setShowFeedback] = useState<boolean>(false);

    useEffect(() => {
        async function fetchFeedback() {
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

                const systemPrompt = "You are an expert in guiding victims of digital stalking with a focus on enhancing security for online platforms such as social media, email, and banking accounts. You provide empathetic support and practical, step-by-step guidance for securing online accounts and privacy settings. For instance, if a user feels their email account may be compromised, you guide them through changing their password, setting up two-factor authentication, and reviewing recent account activity for any unauthorized access. While you do not provide legal advice or intervene directly, you offer detailed and actionable advice to help users safeguard their information. Additionally, you recommend contacting the Dansk Stalking Center at +45 70 20 30 82. You always respect user privacy and handle all interactions with strict confidentiality."

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
        }

        fetchFeedback();
    }, [responses, onFeedbackReady]);

    const handleSeeResult = () => {
        setDialogOpen(false);
        setShowFeedback(true);
        onSeeResultClick();
    };

    return (
        <div>
            <Dialog open={dialogOpen}>
                <DialogTitle>Loading Feedback</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">This test is designed to give an educated guess. On this page we have created an AI that is specialized in digital security. Based on your answers, it provides feedback and guidance. Feel free to ask additional questions, for instance, how to check which devices have access to your Snapchat account.</Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                        {loading ? <CircularProgress /> : <CheckCircleOutlineIcon style={{ color: 'green', fontSize: 40 }} />}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSeeResult} color="primary" disabled={loading}>
                        See result
                    </Button>
                </DialogActions>
            </Dialog>
            {showFeedback && (
                <>
                    <h2>Personalized Feedback</h2>
                    <Card>{feedback}</Card>
                </>
            )}
        </div>
    );
};

export default Feedback;
