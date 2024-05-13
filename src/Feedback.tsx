import React, { useEffect, useState } from "react";
import getOpenAIResponse from "./OpenAiRequest.tsx";

const Feedback: React.FC<{ responses: any[] }> = ({ responses }) => {
    const [feedback, setFeedback] = useState<string>("Loading feedback...");

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

                const prompt = `${specialInstructions}Given the following responses: ${responses.map(r => `${r.question} Answer: ${r.answer}`).join(", ")}, generate supportive and helpful feedback for a victim of stalking.`;

                const result = await getOpenAIResponse([{ role: "system", content: prompt }]);
                setFeedback(result.choices[0].message.content.trim());
            } catch (error) {
                console.error("Error fetching feedback:", error);
                setFeedback("Failed to load feedback, please try again later.");
            }
        }

        fetchFeedback();
    }, [responses]);

    return (
        <div>
            <h2>Personalized Feedback</h2>
            <p>{feedback}</p>
        </div>
    );
};

export default Feedback;
