import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TemperatureGraph from "../components/molecules/TemperatureGraph";
import HumidityGraph from "../components/molecules/HumidityGraph";
import LightGraph from "../components/molecules/LightGraph";

const GraphScreen = () => {
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [humidityData, setHumidityData] = useState<number[]>([]);
  const [lightData, setLightData] = useState<number[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.1.221");

    ws.current.onopen = () => {
      console.log("Connected to the WebSocket server");
      ws.current?.send("Hello, server!");
    };

    ws.current.onmessage = (event) => {
      console.log("Message from server:", event.data);

      try {
        const data = JSON.parse(event.data);

        const temperature = parseFloat(data.temperature);
        if (!isNaN(temperature)) {
          setTemperatureData((prevData) => [
            ...prevData.slice(-9),
            temperature,
          ]);
        }

        const humidity = parseFloat(data.humidity);
        if (!isNaN(humidity)) {
          setHumidityData((prevData) => [...prevData.slice(-9), humidity]);
        }

        const light = parseFloat(data.light);
        if (!isNaN(light)) {
          setLightData((prevData) => [...prevData.slice(-9), light]);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.scrollView}
    >
      <View style={styles.graphContainer}>
        {temperatureData.length > 0 ? (
          <TemperatureGraph data={temperatureData} />
        ) : (
          <Text style={styles.noDataText}>Waiting for temperature data...</Text>
        )}

        {humidityData.length > 0 ? (
          <HumidityGraph data={humidityData} />
        ) : (
          <Text style={styles.noDataText}>Waiting for humidity data...</Text>
        )}

        {lightData.length > 0 ? (
          <LightGraph data={lightData} />
        ) : (
          <Text style={styles.noDataText}>
            Waiting for light intensity data...
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#282C34", // Koyu arka plan rengi geri getirildi
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  graphContainer: {
    alignItems: "center",
    paddingVertical: 20, // Her grafik arasına boşluk bırakma
  },
  noDataText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default GraphScreen;
