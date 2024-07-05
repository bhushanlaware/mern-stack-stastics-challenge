import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { BACKEND_URL } from "../constant";

const PieChart = ({ selectedMonth }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchPieData = async () => {
      const { data } = await axios.get(BACKEND_URL + "/api/pie-chart", {
        params: { month: selectedMonth },
      });
      setPieData(data);
    };

    fetchPieData();
  }, [selectedMonth]);

  const data = {
    labels: pieData.map((category) => category._id),
    datasets: [
      {
        data: pieData.map((category) => category.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Transactions Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
