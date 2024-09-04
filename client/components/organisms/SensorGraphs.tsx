import React from "react";
import { View, StyleSheet } from "react-native";
import TemperatureGraph from "../molecules/TemperatureGraph";
import HumidityGraph from "../molecules/HumidityGraph";
import LightGraph from "../molecules/LightGraph";

interface SensorGraphsProps {
  temperatureData: number[];
  humidityData: number[];
  lightData: number[];
}

const SensorGraphs: React.FC<SensorGraphsProps> = ({
  temperatureData,
  humidityData,
  lightData,
}) => {
  return (
    <View style={styles.container}>
      <TemperatureGraph data={temperatureData} />
      <HumidityGraph data={humidityData} />
      <LightGraph data={lightData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default SensorGraphs;
