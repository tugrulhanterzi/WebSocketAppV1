import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const App = () => {
  const [message, setMessage] = useState<string>(""); // Gelen mesajı saklamak için state
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
      setMessage(event.data); // Gelen mesajı state'e kaydediyoruz
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
      <Text style={styles.message}>Server Message: {message}</Text>
      <Button
        title="Send Message"
        onPress={() => {
          if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send("Hello again!");
          }
        }}
      />
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
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;
