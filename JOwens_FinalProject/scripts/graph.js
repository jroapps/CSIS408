// setting up canvas for graph
const setupCanvas = () => {
  var canvas = document.getElementById("fundraisingCanvas");
  var context = canvas.getContext("2d");

  context.fillStyle = "white";
  context.fillRect(0, 0, 550, 550);
}

// drawing the chart from the user data
const drawChart = () => {
  // checking for entries
  if (localStorage.getItem("entries") === null) {
    alert("No entries exist. To see chart, enter fundraising.");
    window.location.href = "fundraising.html";
  } else {
    setupCanvas();

    // filling background
    const plugin = {
      beforeDraw: (chart) => {
        const context = chart.canvas.getContext('2d');
        context.save();
        context.globalCompositeOperation = 'destination-over';
        context.fillStyle = '#dddddd';
        context.fillRect(0, 0, chart.width, chart.height);
        context.restore();
      }
    };

    // initializing arrays
    var dateArray = new Array();
    var amountArray = new Array();
    var chartArray = new Array();
    getGoalHistory(dateArray, amountArray, chartArray);

    // sorting by date
    chartArray.sort();

    // populating arrays by date
    for (var i = 0; i < chartArray.length; i++) {
      dateArray[i] = chartArray[i][0];
      amountArray[i] = chartArray[i][1];
    }

    // label for bottom of chart
    const labels = dateArray;

    // data for chart
    const data = {
      labels: labels,
      datasets: [{
        label: 'Daily Fundraising',
        backgroundColor: '#7c1e00',
        borderColor: '#7c1e00',
        pointBackgroundColor: 'black',
        pointBorderColor: 'black',
        pointStyle: 'star',
        data: amountArray,
        pointRadius: 6,
        tension: 0.4
      }]
    };

    // registering data label plugin
    Chart.register(ChartDataLabels);

    // options for chart
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'black',
            font: {
              weight: 'bold',
              size: 13
            }
          }
        },
        title: {
          display: true,
          text: 'Fundraising Graph',
          color: 'black',
          font: {
            size: 28
          }
        },
        datalabels: {
          color: 'white',
          align: 'center',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      scales: {
        x: {
          display: true,
          ticks: {
            color: 'black',
            align: 'center',
            font: {
              weight: 'bold'
            }
          },
          title: {
            display: true,
            text: 'Date Given',
            color: 'black',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: {top: 20, left: 0, right: 0, bottom: 0}
          }
        },
        y: {
          display: true,
          beginAtZero: true,
          gridLines: {
            display: true,
            color: "red"
          },
          ticks: {
            color: 'black'
          },
          title: {
            display: true,
            text: 'Amount Given',
            color: 'black',
            font: {
              size: 18,
              weight: 'bold'
            },
          }
        }
      } 
    };

    //chart configuration
    const config = {
      type: 'bar',
      data,
      options: options,
      plugins: [plugin]
    };

    // sending chart configuration to canvas
    var myChart = new Chart(
      document.getElementById('fundraisingCanvas'),
      config
    );
  }
}

// getting the fundraising history
const getGoalHistory = (dateArray, amountArray, chartArray) => {
  var entries = JSON.parse(localStorage.getItem("entries"));

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i][0];
    var date = entry.date;

    // converting date to mm/dd format
    const dateConvert = (date) => {
      var entireDate = date.split(' ');
      var thisDate = entireDate[0].split('-');
      var newDate = [thisDate[1], thisDate[2] ].join("/");
      return newDate;
    }
    date = dateConvert(date);

    // x-axis label
    dateArray[i] = date;

    // point to plot on graph
    amountArray[i] = parseFloat(entries[i][0].amountDonated);

    // multidimensional chart array to sort by date
    chartArray[i] = [dateArray[i], amountArray[i]];
  }
  return chartArray;
}