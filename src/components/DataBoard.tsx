import React, { useState, PureComponent, useEffect } from "react";
import { render } from "react-dom";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


interface Provider {
    name: string,
    value: number
}

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
  dataScore: Array<Provider>;
  dataType: Array<Object>;
}) => {
const renderCustomizedLabel = (dataPoints:{
    cx: number,
    cy: number,
    midAngle: number,
    innerRadius: number,
    outerRadius: number,
    percent: number,
    index: number,
    }) => {
    const radius = dataPoints.innerRadius + (dataPoints.outerRadius - dataPoints.innerRadius) * 0.5;
    const x = dataPoints.cx + radius * Math.cos(-dataPoints.midAngle * RADIAN);
    const y = dataPoints.cy + radius * Math.sin(-dataPoints.midAngle * RADIAN);

    return (
        <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        >
        {`${(props.dataScore[dataPoints.index].value != null &&
            props.dataScore[dataPoints.index].value > 0)
            ? dataPoints.index + "-" + (dataPoints.index + 1) + `(${(dataPoints.percent * 100).toFixed(0)}%)`
            : ""
        }`}
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

  const [graph2, setGraph2] = useState(
    <BarChart
      width={500}
      height={300}
      data={props.dataType}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Members" fill="#120539" />
      <Bar dataKey="Favorites" fill="#4714E3" />
    </BarChart>
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

  useEffect(() => {
    setGraph2(
      <BarChart
        width={600}
        height={300}
        data={props.dataType}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="5 4" />
        <XAxis dataKey="name" />
        <YAxis/>
        <Tooltip />
        <Legend />
        <Bar dataKey="members" fill="#120539" />
        <Bar dataKey="favorites" fill="#4714E3" />
      </BarChart>
    );
  }, [props.dataType]);
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
        <div className="col-span-2 py-4 border-t my-8">{graph2}</div>
      </div>
    </div>
  );
};

export default DataBoard;
