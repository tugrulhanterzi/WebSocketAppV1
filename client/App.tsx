import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

const App = () => {
  const [sensorData, setSensorData] = useState({
    temperature: "",
    humidity: "",
    light: "",
    relay1: "",
    relay2: "",
  });

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.1.84:8080");

    ws.current.onopen = () => {
      console.log("Connected to the WebSocket server");
      ws.current?.send("Hello, server!");
    };

    ws.current.onmessage = (event) => {
      console.log("Message from server:", event.data);
      const data = JSON.parse(event.data);
      setSensorData(data);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Real-Time Sensor Data</Text>
          <View style={styles.grid}>
            <View style={styles.card}>
              <Text style={styles.label}>Temperature</Text>
              <Text style={styles.value}>{sensorData.temperature} °C</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Humidity</Text>
              <Text style={styles.value}>{sensorData.humidity} %</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Light Intensity</Text>
              <Text style={styles.value}>{sensorData.light} lux</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Relay 1 Status</Text>
              <Text style={styles.value}>{sensorData.relay1}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Relay 2 Status</Text>
              <Text style={styles.value}>{sensorData.relay2}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Placeholder</Text>
              <Text style={styles.value}>N/A</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#282C34",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
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

export default App;
