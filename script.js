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
            'Authorization': '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' // Reemplaza con tu API Key
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
