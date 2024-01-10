
var xValues = ["Phone", "Laptop", "Tv", "Router", "Keyboard"];
var yValues = [55, 49, 44, 24, 35];
var barColors = ["red", "green","blue","orange","brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Earning"
    }
  }
});
