import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Graph from "../atoms/Graph";

interface LightGraphProps {
  data: number[];
}

const LightGraph: React.FC<LightGraphProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Light Intensity</Text>
      <Graph data={data} label="Light Intensity" yAxisSuffix=" lux" />
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

export default LightGraph;
