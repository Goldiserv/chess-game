import { Client } from 'whatsapp-web.js';
const client = new Client({});

client.on('qr', (qr) => {
    // Generate and display QR code for user to scan
    console.log('QR Code:', qr);
});

client.on('ready', () => {
    // Send message to dummy phone number
    const number = '6590111377'; // replace with actual dummy phone number
    const message = 'test';

    client.sendMessage(`${number}@c.us`, message).then(() => {
        console.log('Message sent!');
        client.destroy(); // disconnect client after message is sent
    }).catch((err) => {
        console.error('Error sending message:', err);
        client.destroy(); // disconnect client on error
    });
});

// client.initialize();
