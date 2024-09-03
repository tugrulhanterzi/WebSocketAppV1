// ws kütüphanesini içe aktar
const WebSocket = require('ws');

// 8080 portunda çalışan yeni bir WebSocket sunucusu oluştur
const server = new WebSocket.Server({ port: 8080 });

// Rastgele sensör verileri üreten bir fonksiyon
function generateRandomSensorData() {
    return {
        temperature: (Math.random() * 100).toFixed(2),  // Sıcaklık sensörü (0-100 arasında rastgele)
        humidity: (Math.random() * 100).toFixed(2),     // Nem sensörü (0-100 arasında rastgele)
        light: Math.floor(Math.random() * 1024),        // Işık sensörü (0-1024 arasında rastgele)
        relay1: Math.random() > 0.5 ? 'ON' : 'OFF',     // Röle 1 durumu (ON/OFF rastgele)
        relay2: Math.random() > 0.5 ? 'ON' : 'OFF',     // Röle 2 durumu (ON/OFF rastgele)
    };
}

// Bir istemci bağlandığında çalışacak olan olay işleyicisini tanımla
server.on('connection', ws => {
    console.log('Yeni bir istemci bağlandı');

    // İstemciye hoş geldiniz mesajı gönder
    ws.send('WebSocket sunucusuna hoş geldiniz!');

    // İstemciye periyodik olarak rastgele sensör verileri gönder
    const sendInterval = setInterval(() => {
        const data = generateRandomSensorData();
        ws.send(JSON.stringify(data));  // Verileri JSON formatında gönder
    }, 2000);  // Her 2 saniyede bir veri gönder

    // İstemciden bir mesaj alındığında çalışacak olan olay işleyicisi
    ws.on('message', message => {
        console.log(`Alınan mesaj: ${message}`);
        ws.send(`Echo: ${message}`);  // Alınan mesajı geri gönder
    });

    // İstemci bağlantıyı kapattığında çalışacak olan olay işleyicisi
    ws.on('close', () => {
        clearInterval(sendInterval);  // Bağlantı kapandığında interval'i temizle
        console.log('İstemci bağlantıyı kapattı');
    });
});

// Sunucunun çalıştığını belirten bir mesaj yazdır
console.log('WebSocket sunucusu ws://localhost:8080 adresinde çalışıyor');
