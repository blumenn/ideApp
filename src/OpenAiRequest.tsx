import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getOpenAIResponse(messages: any) {
  return openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    temperature: 1,
    max_tokens: 300,
    top_p: 1,
  });
}

export default getOpenAIResponse;
