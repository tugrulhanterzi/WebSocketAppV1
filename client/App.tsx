import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

const App = () => {
  const [sensorData, setSensorData] = useState({
    temperature: "",
    humidity: "",
    light: "",
    relay1: "",
    relay2: "",
  });

  const ws = useRef<WebSocket | null>(null); // ws referansını useRef ile tanımlıyoruz

  // WebSocket bağlantısını tanımlıyoruz
  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.1.84:8080"); // WebSocket bağlantısını kuruyoruz

    ws.current.onopen = () => {
      console.log("Connected to the WebSocket server");
      ws.current?.send("Hello, server!"); // Sunucuya bir mesaj gönderiyoruz
    };

    ws.current.onmessage = (event) => {
      console.log("Message from server:", event.data);
      const data = JSON.parse(event.data); // Gelen veriyi JSON formatında parse ediyoruz
      setSensorData(data); // Gelen veriyi state'e kaydediyoruz
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup: Bileşen unmount edildiğinde bağlantıyı kapatıyoruz
    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor Data</Text>
      <Text style={styles.data}>Temperature: {sensorData.temperature} °C</Text>
      <Text style={styles.data}>Humidity: {sensorData.humidity} %</Text>
      <Text style={styles.data}>Light: {sensorData.light} lux</Text>
      <Text style={styles.data}>Relay 1: {sensorData.relay1}</Text>
      <Text style={styles.data}>Relay 2: {sensorData.relay2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  data: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default App;
