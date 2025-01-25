"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface RevenueChartProps {
  monthlyRevenue: { month: string; revenue: number }[];
}

function RevenueChart({ monthlyRevenue }: RevenueChartProps) {
  const chartOptions = {
    chart: {
      id: "monthly-revenue",
    },
    xaxis: {
      categories: monthlyRevenue.map((item) => item.month),
    },
    colors: ["#4CAF50"],
  };

  const chartSeries = [
    {
      name: "Revenue",
      data: monthlyRevenue.map((item) => +item.revenue.toFixed(2)),
    },
  ];

  return (
    <div className="revenue-chart mb-8">
      <h2 className="text-2xl font-semibold mb-4">Monthly Revenue</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height="300"
      />
    </div>
  );
}

export default RevenueChart;
