import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import { useAuthenticatedUser } from "../../contexts/AuthContext";

export default function LineChartData() {
  const theme = useTheme();
  const [selectedData, setSelectedData] = useState<string>("broad_jump");
  const { userProfile, loading } = useAuthenticatedUser();
  const [chartData, setChartData] = useState<any>(null);

  const screenWidth = Dimensions.get("window").width;

  console.log(userProfile);

  useEffect(() => {
    if (userProfile?.jumpSessions && selectedData) {
      const filteredJumpSessions = userProfile.jumpSessions.filter(
        (session) => session.jumpId === selectedData
      );

      const data = {
        labels: [],
        datasets: [
          {
            data: filteredJumpSessions.map(
              (session) => session.sessionHighestJump
            ),
          },
        ],
      };

      setChartData(data);
    }
  }, [userProfile, selectedData]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!chartData) {
    return <Text>No data available for the selected jump.</Text>;
  }

  const chartConfig = {
    backgroundColor: theme.colors.onSecondary,
    backgroundGradientFrom: theme.colors.onSecondary,
    backgroundGradientTo: theme.colors.onSecondary,
    color: (opacity = 1) => `rgba(107, 79, 170, ${opacity})`,
    labelColor: (opacity = 1) => {
      return `rgba(${theme.colors.onBackground}, ${opacity})`;
    },
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
    useShadowColorFromDataset: false,
  };

  return (
    <LineChart
      data={chartData}
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
