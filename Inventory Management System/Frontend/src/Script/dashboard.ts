import { Chart, registerables } from "chart.js";

// Register necessary plugins
Chart.register(...registerables);

var xValues = ["Phone", "Laptop", "Tv", "Router", "Keyboard"];
var yValues = [55, 49, 44, 24, 35];
var barColors = ["red", "green", "blue", "orange", "brown"];

new Chart("barChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Earning",
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Products",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Earnings",
        },
      },
    },
  },
});


// pie charts
var xValues = ["keyboard", "phone", "router", "ssd card", "memory card"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

new Chart("pieChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Number of Product 2024",
      },
    },
  },
});