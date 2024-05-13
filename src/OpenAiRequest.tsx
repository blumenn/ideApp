import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser:true
});

async function getOpenAIResponse(messages) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.5,
        max_tokens: 1000,
        top_p: 1,
    });

    return response;
}

export default getOpenAIResponse;