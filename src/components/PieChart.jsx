import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({data}){

  const catSet = new Set([])
  data.forEach((item) => {
    catSet.add(item.exTypeName)
  })

  const amounts = {}

  for(let cat of [...catSet]){
    amounts[cat] = data.filter((item) => item.exTypeName === cat).reduce((a, c) => a + c.exAmount, 0)
  }

  let chartData = {
    labels: Object.keys(amounts), 
    datasets: [
      {
        label: "Expenses",
        data: Object.values(amounts),
        backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  }

  return (
    <Pie data={chartData} />
  )
}