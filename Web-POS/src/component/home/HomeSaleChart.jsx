import React from 'react'
import { Chart } from "react-google-charts";
const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];
  
  const options = {
    title: "Company Performance",
    hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "70%", height: "70%" },
  };
function HomeSaleChart() {
    return <Chart chartType="AreaChart" data={data} options={options} />;
}

export default HomeSaleChart