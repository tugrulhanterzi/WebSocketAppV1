import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

const SensorScreen = () => {
  const [sensorData, setSensorData] = useState({
    temperature: "",
    humidity: "",
    light: "",
  });

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Pico W'nin IP adresini ve port numarasını doğru şekilde kullanın
    ws.current = new WebSocket("ws://192.168.1.24:8080");

    ws.current.onopen = () => {
      console.log("WebSocket sunucusuna bağlanıldı");
      ws.current?.send("Merhaba sunucu!"); // İstemci bağlantı mesajı gönderir
    };

    ws.current.onmessage = (event) => {
      console.log("Sunucudan gelen veri:", event.data); // Gelen ham veriyi kontrol edin
      try {
        const data = JSON.parse(event.data); // Gelen veriyi JSON formatına çevir
        setSensorData(data); // Sensör verisini state içine set et
      } catch (error) {
        console.error("Veri çözümleme hatası:", error); // JSON parse hatası olursa yakala
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket bağlantısı kapatıldı");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket hatası:", error);
    };

    return () => {
      ws.current?.close(); // Bileşen kapanırken WebSocket bağlantısını kapat
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor Data</Text>
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.label}>Temperature</Text>
          <Text style={styles.value}>
            {sensorData.temperature
              ? `${sensorData.temperature} °C`
              : "Loading..."}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Humidity</Text>
          <Text style={styles.value}>
            {sensorData.humidity ? `${sensorData.humidity} %` : "Loading..."}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Light Intensity</Text>
          <Text style={styles.value}>
            {sensorData.light ? `${sensorData.light} lux` : "Loading..."}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282C34",
  },
  title: {
    fontSize: 28,
    color: "#61DAFB",
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: "40%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: "#BBBBBB",
    marginBottom: 10,
    textAlign: "center",
  },
  value: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SensorScreen;
