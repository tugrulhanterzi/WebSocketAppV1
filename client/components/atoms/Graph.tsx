import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface GraphProps {
  data: number[];
  label: string;
  yAxisSuffix?: string;
}

const Graph: React.FC<GraphProps> = ({ data, label, yAxisSuffix = "" }) => {
  return (
    <LineChart
      data={{
        labels: data.map((_, index) => `${index + 1}`),
        datasets: [
          {
            data: data,
          },
        ],
      }}
      width={screenWidth - 40}
      height={220}
      yAxisSuffix={yAxisSuffix}
      chartConfig={chartConfig}
      bezier
      style={styles.chart}
    />
  );
};

const chartConfig = {
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
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Graph;
