"use client";

import { useUserProfile } from "../../contexts/UserContext";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useState } from "react";
import { useTheme } from "react-native-paper";

export default function LineChartData() {
  const theme = useTheme();
  const [selectedData, setSelectedData] = useState("broad_jump");
  const { userProfile } = useUserProfile();

  const screenWidth = Dimensions.get("window").width;

  if (userProfile) {
    const filteredSessions = userProfile.jumpSessions.filter((session) => {
      const hasSelectedJump = session.jumps.some(
        (jump) => jump.jumpId === selectedData
      );
      return hasSelectedJump;
    });

    const xLabels = filteredSessions.map((session) => session.date);
    const yLabel = filteredSessions.map((session) => {
      const jump = session.jumps.find((jump) => jump.jumpId === selectedData);
      return jump ? jump.distance : 0;
    });

    const data = {
      labels: xLabels,
      datasets: [
        {
          data: yLabel,
        },
      ],
    };
    const chartConfig = {
      backgroundColor: theme.colors.onSecondary,
      backgroundGradientFrom: theme.colors.onSecondary,
      backgroundGradientTo: theme.colors.onSecondary,
      color: (opacity = 1) => `rgba(107, 79, 170, ${opacity})`,
      labelColor: (opacity = 1) => {
        return `rgba(${theme.colors.onBackground}, ${opacity})`;
      },
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      decimalPlaces: 0,
      useShadowColorFromDataset: false,
    };

    return (
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        yAxisSuffix="in"
        withHorizontalLines={false}
        withVerticalLines={false}
        bezier={true}
      />
    );
  }

  return <View>Loading...</View>;
}