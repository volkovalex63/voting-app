<!-- Google chart part-->
// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart(a=[]) {
  var data = google.visualization.arrayToDataTable([
    ['Effort', 'Amount given'],
    ['Work', 8],
    ['Eat', 2],
    ['TV', 4],
    ['Gym', 2],
    ['Sleep', 8]
  ]);

    // Optional; add a title and set the width and height of the chart
    // var options = {'title':'My Average Day', 'width':550, 'height':400, 'background-color':'black'};
  var options = {
    pieHole: 0.5,
    pieSliceTextStyle: {
      color: 'black',
    },
    backgroundColor: "#F8F8F8",
    is3D: 'true'
  };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('showChart'));
  chart.draw(data, options);
}
