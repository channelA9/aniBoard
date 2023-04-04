import React, { useState, PureComponent, useEffect } from "react";
import { render } from "react-dom";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#000000",
  "#09021C",
  "#120539",
  "#1B0755",
  "#240A71",
  "#2C0C8E",
  "#350FAA",
  "#3E11C6",
  "#4714E3",
  "#5016FF",
];

const RADIAN = Math.PI / 180;

const DataBoard = (props: {
  avgScore: number;
  totalFavs: number;
  totalReviews: number;
  dataScore: Array<Object>;
}) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${props.dataScore[index].value > 0 ? index + "-" + (index + 1) + `(${(percent * 100).toFixed(0)}%)` : ""}`}
      </text>
    );
  };

  const [graph1, setGraph1] = useState(
    <PieChart width={0} height={0}>
      <Pie
        data={props.dataScore}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {props.dataScore.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );

  useEffect(() => {
    setGraph1(
      <PieChart width={320} height={320}>
        <Pie
          data={props.dataScore}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={160}
          fill="#8884d8"
          dataKey="value"
        >
          {props.dataScore.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }, [props.dataScore]);
  return (
    <div className="w-full max-w-screen-md xl:max-w-screen-lg min-h-64 p-4 mt-2 bg-white  rounded-sm">
      <h2 className="font-bold text-2xl">Data</h2>
      <div className="grid grid-cols-3">
        <div className="flex place-content-center place-items-center flex-col">
          <h3>AVERAGE SCORE</h3>
          <h3 className="text-xl">{props.avgScore}</h3>
        </div>
        <div className="flex place-content-center place-items-center flex-col">
          <h3>TOTAL FAVORITES</h3>
          <h3 className="text-xl">{props.totalFavs}</h3>
        </div>
        <div className="flex place-content-center place-items-center flex-col">
          <h3>TOTAL REVIEWS</h3>
          <h3 className="text-xl">{props.totalReviews}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 place-content-center place-items-center my-8 py-4 border-t">
        {graph1}
        <div className="flex place-content-center place-items-center flex-col">
          <h3 className="text-4xl">Score Distribution</h3>
        </div>
      </div>
    </div>
  );
};

export default DataBoard;
