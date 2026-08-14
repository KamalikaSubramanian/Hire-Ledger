"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    month: string;
    total: number;
  }[];
}

export default function AnalysisTrendChart({ data }: Props) {
  return (
    <div className="dashboard-chart-card">
      <div className="dashboard-chart-header">
        <div>
          <p className="dashboard-chart-label">ANALYSIS ACTIVITY</p>

          <h3 className="dashboard-chart-title">
            Monthly Resume Analysis
          </h3>

          <p className="dashboard-chart-description">
            Track how many resume analyses you completed each month.
          </p>
        </div>
      </div>

      <div className="dashboard-chart-wrapper">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 5"
              stroke="#a8b5ca"
              strokeOpacity={0.55}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#52627a",
                fontSize: 12,
              }}
              axisLine={{
                stroke: "#9aa9bd",
              }}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fill: "#52627a",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#eef2f8",
                border: "1px solid #c3cede",
                borderRadius: "12px",
                color: "#263653",
                boxShadow: "0 8px 25px rgba(50, 65, 95, 0.15)",
              }}
              labelStyle={{
                color: "#394b68",
                fontWeight: 600,
              }}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#4f5fae"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#4f5fae",
                stroke: "#eaf0f8",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#4f5fae",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}