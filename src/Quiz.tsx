import React, { CSSProperties, useState } from "react";
import Questionnaire from "./Questionnaire";
import Feedback from "./Feedback";
import Chat from "./Chat";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "./Components/footer";
import Header from "./Components/header";
import Background from "./Components/background";

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
        h4: {
            color: '#293241',
        },
        body1: {
            color: '#3d5a80',
        },
    },
});

interface ScrollableContentStyle extends CSSProperties {
    maxHeight?: string;
    overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto'; // Specify the exact type for overflowY
}

const Quiz: React.FC = () => {
    const [step, setStep] = useState("frontPage");
    const [responses, setResponses] = useState<any[]>([]);
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleQuestionnaireSubmit = (answers: any[]) => {
        setResponses(answers);
        setStep("feedback");
    };

    const handleFeedbackReceived = (feedback: string) => {
        setFeedback(feedback);
        // Don't change step to "chat" yet; let user decide
    };

    const handleSeeResultClick = () => {
        setStep("chat");
    };

    const scrollableContentStyle: ScrollableContentStyle = {
        maxHeight: "calc(100vh - 24vh)", // Adjust the value based on the combined heights of your Header and Footer
        overflowY: "auto", // Enable vertical scrolling
    };

    return (
        <><Header /><><ThemeProvider theme={theme}>
            <Background/>
                <div style={scrollableContentStyle}>
                    {}
                    <Container maxWidth="md">
                {step === "frontPage" && (
                    <Paper elevation={3} style={{ padding: '30px', textAlign: 'center', marginTop: '50px', backgroundColor: '#e0fbfc' }}>
                        <Typography variant="h4" gutterBottom>
                            Welcome to the Digital Stalking Assistance Tool
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Stalking is a sensitive and complex issue, often surrounded by taboo, uncertainty, and a lack of general knowledge. Many people find it difficult to determine whether they are actually being stalked. This tool is designed to help you assess if you are experiencing digital stalking.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            By answering a series of questions, you will receive a personalized assessment from our AI specialist, who will provide you with tailored advice and support. Our AI can help you protect yourself against digital stalking and inform you about the resources and support available in Denmark.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We understand that this can be a difficult and emotional process. Therefore, we ensure that your responses are treated with full confidentiality and respect. Click "Start" to begin your assessment and find the help you need.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => setStep("questionnaire")}>
                            Start
                        </Button>
                    </Paper>
                )}
                {step === "questionnaire" && (
                    <Questionnaire onSubmit={handleQuestionnaireSubmit} />
                )}
                {step === "feedback" && (
                    <Feedback responses={responses} onFeedbackReady={handleFeedbackReceived} onSeeResultClick={handleSeeResultClick} />
                )}
                {step === "chat" && feedback && (
                    <Chat initialMessage={feedback} />
                )}
            </Container>
                </div>
        </ThemeProvider>
            <Footer />
        </></>
    );
};

export default Quiz;
