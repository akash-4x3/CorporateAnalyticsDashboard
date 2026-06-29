import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PerformanceTrendChart({ data }) {
  const chartData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        Performance Trend
      </h2>

      {
      chartData.length === 0 ? (

        <div className="h-80 flex items-center justify-center text-slate-500">
          No performance trend data available.
        </div>

      ) : (

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="reviewPeriod" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              Number(value).toFixed(2),
              "Average Performance Score"
            ]}
          />

          <Line
            type="monotone"
            dataKey="averagePerformanceScore"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

      )
      }
    </div>
  );
}

export default PerformanceTrendChart;
