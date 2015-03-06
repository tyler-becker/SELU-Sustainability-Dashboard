/* Google Chart Gauge
 * Gets data from current_kWh.php
 * Appears on index page
 */

google.load("visualization", "1", { packages: ["gauge"] });
//Below makes the graph loop
google.setOnLoadCallback(drawGauge);

var gaugekWh = null;
function getGaugeData(x){
    gaugekWh = x;
}

function drawGauge() {
    //Below you can set your intial values and names of your graphs
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['kWh', 0],
        ]);

    // below is the options for the width and height
    var gaugeOptions = {
        height: 150,
        max:150,
        minorTicks: 5
    };

    //This creates a new chart object that is used in the div
    var chart1 = new google.visualization.Gauge(document.getElementById('chartgauge_div'));

    //I Guess this draws it first from what I can read in my mind
    chart1.draw(data, gaugeOptions);

    //This is the cool part it invokes to draw the funtion
    //In the data.setValue there is 3 numbers, the first two define a row and column in a array where the third value is located
    //That third value then will affect how the graph changes.
    //The number after the function call is the interval of time on how long it takes to update again with a new number
    setInterval(function () {
        data.setValue(0, 1, gaugekWh);
        chart1.draw(data, gaugeOptions);
    }, 1300);
}