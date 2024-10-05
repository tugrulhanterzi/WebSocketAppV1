import network
import machine
import time
import dht
import usocket as socket  # MicroPython'da 'usocket' olarak geçer

# Wi-Fi bağlantı bilgileri
SSID = "WIFI-NAME"
PASSWORD = "WIFI-PASSWORD"

# LDR sensörü (analog)
ldr_pin = machine.ADC(26)  # GP26 pinine bağlı (ADC0)

# HC-SR04 ultrasonik sensör
trig = machine.Pin(3, machine.Pin.OUT)  # GP3 pinine bağlı
echo = machine.Pin(2, machine.Pin.IN)   # GP2 pinine bağlı

# DHT11 sıcaklık ve nem sensörü
dht_sensor = dht.DHT11(machine.Pin(27))  # GP27 pinine bağlı (DHT11 bağlantısı)

# Wi-Fi'ye bağlanma fonksiyonu
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(SSID, PASSWORD)

    while not wlan.isconnected():
        print('Bağlanılıyor...')
        time.sleep(1)

    print('Wi-Fi Bağlantısı Başarılı!')
    ip = wlan.ifconfig()[0]
    print('IP adresi:', ip)
    return ip

# Mesafe ölçümü fonksiyonu (HC-SR04 için)
def measure_distance():
    trig.low()
    time.sleep_us(2)
    trig.high()
    time.sleep_us(10)
    trig.low()

    while echo.value() == 0:
        signal_off = time.ticks_us()
    while echo.value() == 1:
        signal_on = time.ticks_us()

    time_passed = signal_on - signal_off
    distance_cm = (time_passed * 0.0343) / 2
    return distance_cm

# DHT11 sensöründen sıcaklık ve nem okuma fonksiyonu
def read_dht():
    dht_sensor.measure()  # DHT11'den ölçüm yap
    temperature = dht_sensor.temperature()
    humidity = dht_sensor.humidity()
    return temperature, humidity

# WebSocket sunucusunu başlatma
def websocket_server(ip):
    addr = socket.getaddrinfo(ip, 8084)[0][-1]  # 8081 portunu kullan
    s = socket.socket()
    s.bind(addr)
    s.listen(1)
    print(f"WebSocket sunucusu {ip}:8084 üzerinde başlatıldı, istemcilerin bağlanmasını bekliyor...")

    while True:
        cl, addr = s.accept()
        print('İstemci bağlandı:', addr)

        try:
            # Verileri döngü içinde istemciye gönder
            while True:
                # LDR'den veri oku (ADC değeri)
                ldr_value = ldr_pin.read_u16()

                # Ultrasonik mesafe sensöründen mesafeyi ölç
                distance = measure_distance()

                # DHT11 sensöründen sıcaklık ve nem verilerini oku
                try:
                    temperature, humidity = read_dht()
                except OSError as e:
                    print("DHT11 sensör hatası:", e)
                    temperature, humidity = None,
                    
                # Verileri JSON formatında hazırla
                if temperature is not None and humidity is not None:
                    data = f'{{"temperature": {temperature}, "humidity": {humidity}, "distance": {distance}, "light": {ldr_value}}}\n'
                else:
                    data = f'{{"temperature": null, "humidity": null, "distance": {distance}, "light": {ldr_value}}}\n'


                # Veriyi istemciye gönder (WebSocket üzerinden)
                cl.send(data.encode())

                # 2 saniye bekle
                time.sleep(2)
        
        except OSError as e:
            print(f"Bağlantı kesildi: {e}")
        finally:
            cl.close()  # Bağlantıyı düzgün şekilde kapat

# Wi-Fi'ye bağlan ve IP adresini al
ip_address = connect_wifi()

# WebSocket sunucusunu başlat
websocket_server(ip_address)

