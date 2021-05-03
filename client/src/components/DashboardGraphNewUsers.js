import { Line } from "react-chartjs-2";
import React from "react";
import API from "../utils/API";
import moment from "moment";
export default function dashboardGetNewUsers({ dashgraph }) {
  const usercount = [];
  const dates = [
    moment().subtract(4, "days").format("YYYY-MM-DD"),

    moment().subtract(3, "days").format("YYYY-MM-DD"),

    moment().subtract(2, "days").format("YYYY-MM-DD"),

    moment().subtract(1, "days").format("YYYY-MM-DD"),

    moment().format("YYYY-MM-DD"),
  ];
  const counts = dashgraph.map((count) => {
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      if (count.date_col_formed === date) {
        console.log(count.date_col_formed);
        usercount.push(count.count);
      } else {
        usercount.push(0);
      }
    }
    console.log(usercount);
    return usercount;
  });
  const data = {
    labels: dates,

    datasets: [
      {
        label: "Count of new users",
        data: usercount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <Line className="admindash--graph" data={data} width={100} height={100} />
  );
}
