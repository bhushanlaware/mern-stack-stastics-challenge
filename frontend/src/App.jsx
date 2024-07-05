import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("03");

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Stack Challenge</h1>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={(i + 1).toString().padStart(2, "0")}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>
      </header>

      <TransactionsTable selectedMonth={selectedMonth} />
      <Statistics selectedMonth={selectedMonth} />
      <div className="flex">
        <div style={{ width: "45%" }}>
          <BarChart selectedMonth={selectedMonth} />
        </div>
        <div style={{ width: "45%" }}>
          <PieChart selectedMonth={selectedMonth} />
        </div>
      </div>

    </div>
  );
};

export default App;
