import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Graph from "../atoms/Graph";

interface TemperatureGraphProps {
  data: number[];
}

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperature</Text>
      {data.length > 0 ? (
        <Graph data={data} label="Temperature" yAxisSuffix="°C" />
      ) : (
        <Text style={styles.noData}>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: "#61DAFB",
    marginBottom: 10,
  },
  noData: {
    color: "#ff0000",
  },
});

export default TemperatureGraph;
