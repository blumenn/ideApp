import React, { useEffect, useState } from 'react';
import getOpenAIResponse from './OpenAiRequest';

function App() {
    const [response, setResponse] = useState(null);
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        const fetchResponse = async () => {
            const messages = [
                {role: "system", content: "You are a helpful assistant."},
                {role: "user", content: prompt}
            ];
            const result = await getOpenAIResponse(messages);
            setResponse(result);
        };

        fetchResponse();
    }, [prompt]);

    const handleInputChange = (event) => {
        setPrompt(event.target.value);
    };

    return (
        <div className="App">
            <header className="App-header">
                <input type="text" placeholder="Type your message here" onChange={handleInputChange} />

                {response && (
                    <div>
                        <h1>OpenAI Response:</h1>
                        <p>{response.choices[0].message.content}</p>
                        <button onClick={() => setPrompt('')}>Clear</button>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;