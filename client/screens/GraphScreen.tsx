import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const GraphScreen = () => {
  const [testData, setTestData] = useState<number[]>([20, 45, 28, 80, 99, 43]);

  useEffect(() => {
    // Simulate data update every 2 seconds
    const interval = setInterval(() => {
      setTestData((prevData) => [...prevData.slice(-5), Math.random() * 100]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Graph Screen</Text>
      <LineChart
        data={{
          labels: testData.map((_, index) => `${index + 1}`),
          datasets: [
            {
              data: testData,
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="°C"
        chartConfig={{
          backgroundColor: "#1E2923",
          backgroundGradientFrom: "#08130D",
          backgroundGradientTo: "#1F4037",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
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
    backgroundColor: "#282C34",
  },
  title: {
    fontSize: 24,
    color: "#61DAFB",
    marginBottom: 20,
  },
});

export default GraphScreen;
