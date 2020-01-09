(async function() {
  let myChart = document.getElementById("myChart").getContext("2d");

  let name = [];
  let numbers = [];

  const url = "https://api.punkapi.com/v2/beers?brewed_before=12-2008&abv_gt=6";

  const getData = async url => await fetch(url).then(res => res.json());

  const data = await getData(url);

  data.map(beers => name.push(beers.name));
  console.log(data);

  data.map(beers => numbers.push(beers.id));

  Chart.defaults.global.defaultFontFamily = "Times New Roman";
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontFamily = "#777";
  Chart.defaults.global.animation.duration = 2000;

  let beerChart = new Chart(myChart, {
    type: "line", //bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: name,
      datasets: [
        {
          label: "Beer statistic",
          data: numbers,
          backgroundColor: "#00FF00",
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "black"
        }
      ]
    },
    options: {
      showLines: true,
      scales: {
        yAxes: [
          {
            id: "y-axis-1",
            type: "linear",
            display: true,
            position: "left",
            ticks: {
              beginAtZero: true,
              min: 0
            }
          }
        ]
      },
      title: {
        display: false,
        text: "Beer statistic",
        fontSize: 35
      },

      legend: {
        display: true,
        position: "top",
        labels: {
          fontColor: "black"
        }
      },

      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0
        }
      },

      tooltips: {
        display: false
      }
    }
  });

  console.log(beerChart);

  let info = beerChart.data.datasets[0].data;

  const subtract = arr => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i] - 1;

      if (arr[i] === 0) {
        arr.splice(i, 1);
        beerChart.data.labels.splice(i, 1);
      }
    }
    return arr;
  };

  let updateChart = setInterval(() => {
    subtract(info);
    beerChart.data.datasets[0].data = info;
    if (info.length == 0) {
      clearInterval(updateChart);
    }
    beerChart.update();
  }, 100);
})();
