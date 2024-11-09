sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    appendMessage('Usuario: ' + userMessage);
    userInput.value = '';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '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' // Reemplaza con tu API Key
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API: ' + response.statusText);
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        appendMessage('ChatGPT: ' + botMessage);
    } catch (error) {
        appendMessage('Error: ' + error.message);
    }
});
