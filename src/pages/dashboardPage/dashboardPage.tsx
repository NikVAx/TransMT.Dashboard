import { View } from "@/components";
import { createArray } from "@/shared/utils";
import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";

export const DashboardPage = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartOptions(options);
    setChartData(data);
  }, []);

  return (
    <div className="flex gap-3 p-3 flex-wrap" style={{
        justifyContent: "center"
    }}>
      {createArray(8).map((x) => {
        return (
          <View key={x} style={{padding: "10px"}}>
            <Chart
              type="pie"
              data={chartData}
              options={chartOptions}
              width="300px"
            />
          </View>
        );
      })}
    </div>
  );
};
