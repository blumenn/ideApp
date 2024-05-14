import React, { useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Question = {
    id: number;
    questionText: string;
    type: "text" | "multiple-choice";
    options?: string[];
};

const questions: Question[] = [
    {
        id: 1,
        questionText: "Have you experienced stalking on any digital platform?",
        type: "multiple-choice",
        options: ["Yes", "No"]
    }
];

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
        h2: {
            color: '#293241',
        },
        body1: {
            color: '#3d5a80',
        },
    },
});

const Questionnaire: React.FC<{ onSubmit: (answers: any[]) => void }> = ({ onSubmit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any[]>([]);

    const handleAnswerChange = (value: string) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = { question: questions[currentQuestionIndex].questionText, answer: value };
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            onSubmit(answers);
        }
    };

    const question = questions[currentQuestionIndex];

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" style={{ marginTop: '50px' }}>
                <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#e0fbfc' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        {question.questionText}
                    </Typography>
                    {question.type === "multiple-choice" ? (
                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                                value={answers[currentQuestionIndex]?.answer || ""}
                                onChange={e => handleAnswerChange((e.target as HTMLInputElement).value)}
                            >
                                {question.options!.map(option => (
                                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    ) : (
                        <textarea
                            value={answers[currentQuestionIndex]?.answer || ""}
                            onChange={e => handleAnswerChange(e.target.value)}
                            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', borderColor: '#98c1d9' }}
                        />
                    )}
                    <Box textAlign="center" marginTop={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNextQuestion}

                        >
                            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default Questionnaire;
