import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Graph from "../atoms/Graph";

interface HumidityGraphProps {
  data: number[];
}

const HumidityGraph: React.FC<HumidityGraphProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Humidity</Text>
      <Graph data={data} label="Humidity" yAxisSuffix="%" />
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
});

export default HumidityGraph;
