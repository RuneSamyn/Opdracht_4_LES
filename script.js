
google.charts.load('current', {'packages':['corechart']});

function drawChart(array) {
    var data = google.visualization.arrayToDataTable(array);


    var options = {
        title: 'Temperature inside and outside',
        curveType: 'function',
        legend: { position: 'right' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart'));

    chart.draw(data, options);
}

$.ajax({
    url: '/getData',
    dataType: "json",
    complete: function(data) {
        for(var x = 1; x<data.responseJSON.length; x++ ){
            data.responseJSON[x][0] = (new Date(data.responseJSON[x][0])).toLocaleTimeString();
        }
        drawChart(data.responseJSON)
    }
  });