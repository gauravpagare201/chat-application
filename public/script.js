const senderSocket = new WebSocket('ws://localhost:3000/sender');
const receiverSocket = new WebSocket('ws://localhost:3000/receiver');

function sendMessage(sender) {
  const inputElement = document.getElementById(`${sender}-input`);
  const message = inputElement.value.trim();

  if (message !== '') {
    const senderOutput = document.getElementById('sender-output');
    const receiverOutput = document.getElementById('receiver-output');

    senderOutput.innerHTML += `<p class="own-message">${message}</p>`;
    receiverOutput.innerHTML += `<p class="received-message">${message}</p>`;

    senderOutput.scrollTop = senderOutput.scrollHeight;
    receiverOutput.scrollTop = receiverOutput.scrollHeight;

    if (sender === 'sender') {
      senderSocket.send(message);
    } else if (sender === 'receiver') {
      receiverSocket.send(message);
    }

    inputElement.value = '';
  }
}

function handleKeyPress(sender, event) {
  if (event.key === 'Enter') {
    sendMessage(sender);
  }
}

senderSocket.addEventListener('message', (event) => {
  handleMessage('sender', event);
});

receiverSocket.addEventListener('message', (event) => {
  handleMessage('receiver', event);
});

function handleMessage(sender, event) {
  const outputElement = document.getElementById(`${sender}-output`);

  if (event.data instanceof Blob) {
    console.log('Received a Blob. Handle it appropriately.');
    return;
  }

  outputElement.innerHTML += `<p class="${sender === 'sender' ? 'own-message' : 'received-message'}">${event.data}</p>`;
  outputElement.scrollTop = outputElement.scrollHeight;
}
