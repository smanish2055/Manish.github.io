import { Chart, registerables } from "chart.js";
import createGetRequest from "../Repositries/GetRequest";
// import loadData from "./getproductlist";
// Register necessary plugins
Chart.register(...registerables);

let productNumber = document.getElementById("product-number");
let quantitySold = document.getElementById("quantity-sold");
let totalProfit = document.getElementById("total-proft");
let chartContainer1 = document.querySelector(".chart-container1");
let chartContainer2 = document.querySelector(".chart-container2");

const barChartFn = (topProducts: any) => {
  var dbYValues = [
    topProducts[0].top_product_profit,
    topProducts[1].top_product_profit,
    topProducts[2].top_product_profit,
    topProducts[3].top_product_profit,
    topProducts[4].top_product_profit,
  ];
  var xValues = [
    topProducts[0].product_name,
    topProducts[1].product_name,
    topProducts[2].product_name,
    topProducts[3].product_name,
    topProducts[4].product_name,
  ];
  var barColors = ["red", "green", "blue", "orange", "brown"];

  // Find the highest value in the array
  var max = Math.max(...dbYValues);

  // Calculate the percentage values relative to the highest value
  var percentageValues = dbYValues.map((value) => (value / max) * 100);

  new Chart("barChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: percentageValues,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Earning (Percentage of Highest Value)",
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
            text: "Percentage",
          },
          min: 0,
          max: 100,
          ticks: {
            callback: (value) => `${value}%`,
          },
        },
      },
    },
  });
};

const pieChartFn = (topQuantitySold: any) => {
  var xValues = [
    topQuantitySold[0].product_name,
    topQuantitySold[1].product_name,
    topQuantitySold[2].product_name,
    topQuantitySold[3].product_name,
    topQuantitySold[4].product_name,
  ];
  var yValues = [
    topQuantitySold[0].quantitySold,
    topQuantitySold[1].quantitySold,
    topQuantitySold[2].quantitySold,
    topQuantitySold[3].quantitySold,
    topQuantitySold[4].quantitySold,
  ];
  var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

  new Chart("pieChart", {
    type: "doughnut",
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
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || "";
              const value = context.parsed || 0;
              return `${label}: ${value}`;
            },
          },
        },
      },
    },
  });
};

const data = await createGetRequest("/dashboard/");
console.log(data);
const loadData = async (data: any) => {
  try {
    if (data) {
      productNumber!.innerHTML = data.productCount;
      quantitySold!.innerHTML = data.productSoldCount;
      totalProfit!.innerHTML = data.totalProfit;

      if (data.topProducts.length >= 5) {
        barChartFn(data.topProducts);
        pieChartFn(data.topQuantitySold);
      } else {
        chartContainer1!.classList.add(
          "alert",
          "alert-danger",
          "text-center",
          "mt-4"
        );
        chartContainer1!.innerHTML = "There Should Be 5 Earning Products";

        chartContainer2!.classList.add(
          "alert",
          "alert-danger",
          "text-center",
          "mt-4"
        );
        chartContainer2!.innerHTML =
          "There Should Be 5 Quantity of Sold Products";
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
loadData(data);
