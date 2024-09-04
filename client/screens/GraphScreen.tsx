import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import TemperatureGraph from "../components/molecules/TemperatureGraph";

const GraphScreen = () => {
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.1.84:8080");

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
    <ScrollView style={styles.scrollView}>
      <TemperatureGraph data={temperatureData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#282C34",
  },
});

export default GraphScreen;
