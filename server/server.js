// ws kütüphanesini içe aktar
const WebSocket = require('ws');

// 8080 portunda çalışan yeni bir WebSocket sunucusu oluştur
const server = new WebSocket.Server({ port: 8080 });

// Bir istemci bağlandığında çalışacak olan olay işleyicisini tanımla
server.on('connection', ws => {
    console.log('Yeni bir istemci bağlandı');

    // İstemciye hoş geldiniz mesajı gönder
    ws.send('WebSocket sunucusuna hoş geldiniz!');

    // İstemciden bir mesaj alındığında çalışacak olan olay işleyicisi
    ws.on('message', message => {
        console.log(`Alınan mesaj: ${message}`);
        ws.send(`Echo: ${message}`); // Alınan mesajı geri gönder
    });

    // İstemci bağlantıyı kapattığında çalışacak olan olay işleyicisi
    ws.on('close', () => {
        console.log('İstemci bağlantıyı kapattı');
    });
});

// Sunucunun çalıştığını belirten bir mesaj yazdır
console.log('WebSocket sunucusu ws://localhost:8080 adresinde çalışıyor');
