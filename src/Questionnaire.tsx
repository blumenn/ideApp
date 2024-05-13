import React, { useState } from "react";

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
    },
    {
        id: 2,
        questionText: "Which platform did the stalking occur on?",
        type: "multiple-choice",
        options: ["Facebook", "Instagram", "Snapchat", "Other"]
    },
    {
        id: 3,
        questionText: "Do you feel in immediate danger and need urgent help",
        type: "multiple-choice",
        options: ["Yes", "No"]
    }
];

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
        <div>
            <h2>{question.questionText}</h2>
            {question.type === "multiple-choice" ? (
                <select
                    value={answers[currentQuestionIndex]?.answer || ""}
                    onChange={e => handleAnswerChange(e.target.value)}
                >
                    <option value="">Select an option</option>
                    {question.options!.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ) : (
                <textarea
                    value={answers[currentQuestionIndex]?.answer || ""}
                    onChange={e => handleAnswerChange(e.target.value)}
                />
            )}
            <button onClick={handleNextQuestion}>
                {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
            </button>
        </div>
    );
};

export default Questionnaire;
