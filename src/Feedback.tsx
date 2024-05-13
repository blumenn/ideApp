import React, { useEffect, useState } from "react";
import getOpenAIResponse from "./OpenAiRequest.tsx";
import Card from "@mui/material/Card";

const Feedback: React.FC<{ responses: any[], onFeedbackReady: (feedback: string) => void }> = ({ responses, onFeedbackReady }) => {
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

                const systemPrompt = "You are an expert in guiding victims of digital stalking with a focus on enhancing security for online platforms such as social media, email, and banking accounts. You provide empathetic support and practical, step-by-step guidance for securing online accounts and privacy settings. For instance, if a user feels their email account may be compromised, you guide them through changing their password, setting up two-factor authentication, and reviewing recent account activity for any unauthorized access. While you do not provide legal advice or intervene directly, you offer detailed and actionable advice to help users safeguard their information. Additionally, you recommend contacting the Dansk Stalking Center at +45 70 20 30 82. You always respect user privacy and handle all interactions with strict confidentiality."


                const prompt = `${specialInstructions}Given the following responses: ${responses.map(r => `${r.question} Answer: ${r.answer}`).join(", ")}, generate supportive and helpful feedback for a victim of stalking.`;

                const result = await getOpenAIResponse([{ role: "system", content: systemPrompt }, { role: "user", content: prompt }]);
                    onFeedbackReady(result.choices[0].message.content);
            } catch (error) {
                console.error("Error fetching feedback:", error);
                onFeedbackReady("Failed to load feedback, please try again later.");
            }
        }

        fetchFeedback();
    }, [responses, onFeedbackReady]);

    return (
        <div>
            <h2>Personalized Feedback</h2>
            <Card>{feedback}</Card>
        </div>
    );
};

export default Feedback;
