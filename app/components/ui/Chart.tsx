import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

interface ChartProps {
  data: number[];
  labels: string[];
  label?: string;
}

export const Chart = ({ data, labels, label = "Données" }: ChartProps) => {
  return (
    <div className="w-full">
      <Line
        data={{
          labels,
          datasets: [
            {
              label,
              data,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.3)",
              tension: 0.4,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
          },
        }}
      />
    </div>
  );
};
