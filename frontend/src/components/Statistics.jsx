import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constant";

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      const { data } = await axios.get(BACKEND_URL + "/api/statistics", {
        params: { month: selectedMonth },
      });
      setStatistics(data);
    };

    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div>
      <h2>Transactions Statistics</h2>
      <div>Total Sale Amount: {statistics.totalSaleAmount}</div>
      <div>Total Sold Items: {statistics.soldItems}</div>
      <div>Total Not Sold Items: {statistics.notSoldItems}</div>
    </div>
  );
};

export default Statistics;
