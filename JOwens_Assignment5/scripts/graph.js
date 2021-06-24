// setting up canvas for graph
const setupCanvas = () => {
  var canvas = document.getElementById("activityCanvas");
  var context = canvas.getContext("2d");

  context.fillStyle = "white";
  context.fillRect(0, 0, 550, 550);
}

// drawing the chart from the user data
const drawChart = () => {
  // checking for entries
  if (localStorage.getItem("entries") === null) {
    alert("No entries exist. To see chart, enter work activity.");
    window.location.href = "workactivity.html";
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
    var hoursArray = new Array();
    var chartArray = new Array();
    getHistory(dateArray, hoursArray, chartArray);

    // sorting by date
    chartArray.sort();

    // populating arrays by date
    for (var i = 0; i < chartArray.length; i++) {
      dateArray[i] = chartArray[i][0];
      hoursArray[i] = chartArray[i][1];
    }

    // label for bottom of chart
    const labels = dateArray;

    // data for chart
    const data = {
      labels: labels,
      datasets: [{
        label: 'Hours Worked per Day',
        backgroundColor: '#007578',
        borderColor: '#007578',
        pointBackgroundColor: 'black',
        pointBorderColor: 'black',
        pointStyle: 'star',
        data: hoursArray,
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
          text: 'Work Activity Graph',
          color: 'black',
          font: {
            size: 28
          }
        },
        datalabels: {
          color: 'black',
          align: 'bottom',
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
            color: '#911000',
            align: 'start',
            font: {
              weight: 'bold'
            }
          },
          title: {
            display: true,
            text: 'Day of Activity',
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
            text: 'Hours Worked',
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
      type: 'line',
      data,
      options: options,
      plugins: [plugin]
    };

    // sending chart configuration to canvas
    var myChart = new Chart(
      document.getElementById('activityCanvas'),
      config
    );
  }
}

// getting the work history
const getHistory = (dateArray, hoursArray, chartArray) => {
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
    hoursArray[i] = parseFloat(entries[i][0].hoursWorked);

    // multidimensional chart array to sort by date
    chartArray[i] = [dateArray[i], hoursArray[i]];
  }
  return chartArray;
}