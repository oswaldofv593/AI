const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const messages = document.getElementById('messages');

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    // Mostrar el mensaje del usuario
    appendMessage('Usuario: ' + userMessage);
    userInput.value = '';

    // Llamar a la API de OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // Reemplaza con tu API Key
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }]
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    // Mostrar el mensaje del bot
    appendMessage('ChatGPT: ' + botMessage);
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight; // Desplazar hacia abajo
}
