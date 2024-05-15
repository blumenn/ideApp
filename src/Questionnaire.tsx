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
        questionText: "Have you felt watched or followed by a particular person, whether you are alone or with others?",
        type: "multiple-choice",
        options: ["Yes", "No", "Don't know"]
    },
    {
        id: 2,
        questionText: "Has this person ever directly or indirectly threatened you, either online or in real life?",
        type: "multiple-choice",
        options: ["Yes", "No", "Don't know"]
    },
    {
        id: 3,
        questionText: "Have you experienced this person contacting your friends, family, or colleagues unannounced to obtain information about you or to spread rumors?",
        type: "multiple-choice",
        options: ["Yes", "No", "Don't know"]
    },
    {
        id: 4,
        questionText: "Have you noticed this person using technology to track your location, such as GPS on your phone or by hacking your online accounts?",
        type: "multiple-choice",
        options: ["Yes", "No", "Don't know"]
    },
    {
        id: 5,
        questionText: "Have you experienced increased anxiety, fear, or stress as a result of this person's actions?",
        type: "multiple-choice",
        options: ["Yes", "No", "Don't know"]
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
