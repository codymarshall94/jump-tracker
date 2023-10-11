import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "react-native-paper";
import EmptyState from "../empty-state/EmptyState";
import { DocumentData } from "firebase/firestore";

const screenWidth = Dimensions.get("window").width;

const LineChartComponent = ({
  jumpSessions,
}: {
  jumpSessions: DocumentData[];
}) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (jumpSessions) {
      // Group and aggregate the jump data by date
      const aggregatedData = jumpSessions.reduce((result, session) => {
        const date = session.date.toDate(); // Assuming date is a Firebase Timestamp
        const formattedDate = date.toISOString().split("T")[0]; // Format date as "yyyy-MM-dd"
        if (!result[formattedDate]) {
          result[formattedDate] = { date: formattedDate, jumps: [] };
        }
        result[formattedDate].jumps.push(session.bestJump);
        return result;
      }, {});

      // Prepare the data for the chart
      const chartData = {
        labels: Object.keys(aggregatedData),
        datasets: [
          {
            data: Object.values(aggregatedData).map(
              (entry) =>
                entry.jumps.reduce((a, b) => a + b, 0) / entry.jumps.length
            ),
          },
        ],
      };

      setChartData(chartData);
    }
  }, [jumpSessions]);

  if (!chartData) {
    return <EmptyState message="No Sessions Tracked" />;
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
};

export default LineChartComponent;
