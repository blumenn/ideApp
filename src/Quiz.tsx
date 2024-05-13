import React, { useState } from "react";
import Questionnaire from "./Questionnaire";
import Feedback from "./Feedback";
import Chat from "./Chat";

const Quiz: React.FC = () => {
    const [step, setStep] = useState("questionnaire");
    const [responses, setResponses] = useState<any[]>([]);
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleQuestionnaireSubmit = (answers: any[]) => {
        setResponses(answers);
        setStep("feedback");
    };

    const handleFeedbackReceived = (feedback: string) => {
        setFeedback(feedback);
        setStep("chat");
    };

    return (
        <div>
            {step === "questionnaire" && (
                <Questionnaire onSubmit={handleQuestionnaireSubmit} />
            )}
            {step === "feedback" && (
                <Feedback responses={responses} onFeedbackReady={handleFeedbackReceived} />
            )}
            {step === "chat" && feedback && (
                <Chat initialMessage={feedback} />
            )}
        </div>
    );
};

export default Quiz;
