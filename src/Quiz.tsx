import React, { useState } from "react";
import Questionnaire from "./Questionnaire";
import Feedback from "./Feedback";

const Quiz: React.FC = () => {
    const [step, setStep] = useState("questionnaire");
    const [responses, setResponses] = useState<any[]>([]);

    const handleQuestionnaireSubmit = (answers: any[]) => {
        setResponses(answers);
        setStep("feedback");
    };

    return (
        <div>
            {step === "questionnaire" ? (
                <Questionnaire onSubmit={handleQuestionnaireSubmit} />
            ) : (
                <Feedback responses={responses} />
            )}
        </div>
    );
};

export default Quiz;
