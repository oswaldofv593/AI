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
                'Authorization': 'sk-svcacct-uPRIhq6uswfObbCNmVCbEeXIqMNxjcpsVUdragdmrDCdUI6vtS-IqQKfxTz0BBT3BlbkFJqSOeAJwrYaxtyiVWU2FX-kEyb_AOfB3uozlNxdj6wI5TzqmaLGlMm_jIwnKVIAsk-svcacct-uPRIhq6uswfObbCNmVCbEeXIqMNxjcpsVUdragdmrDCdUI6vtS-IqQKfxTz0BBT3BlbkFJqSOeAJwrYaxtyiVWU2FX-kEyb_AOfB3uozlNxdj6wI5TzqmaLGlMm_jIwnKVIA' // Reemplaza con tu API Key
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
