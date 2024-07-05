import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { BACKEND_URL } from "../constant";

const BarChart = ({ selectedMonth }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchBarData = async () => {
      const { data } = await axios.get(BACKEND_URL + "/api/bar-chart", {
        params: { month: selectedMonth },
      });
      setBarData(data);
    };

    fetchBarData();
  }, [selectedMonth]);

  const data = {
    labels: barData.map((range) => `${range.$range[0]} - ${range.$range[1]}`),
    datasets: [
      {
        label: "# of Items",
        data: barData.map((range) => range.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
