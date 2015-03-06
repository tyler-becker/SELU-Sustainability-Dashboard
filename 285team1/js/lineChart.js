/* Moving Line Chart
 * Used on the index page
 * Gets data from LineChartData.php
 * Shows kW values over the previous 24 hours
 */

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(initChart);

var data2 = [];
var kW = [];
var weather = [];
var time2 = [];
var temp = [];
var MAX = 24;
var paused = false;
var looper;
var counter;
var delay = 4000;
var lineOptions;
var dataTable;
var chart;
   
function initChart() {

  dataTable = new google.visualization.DataTable();

  dataTable.addColumn('string', 'x');
  dataTable.addColumn('number', ' ');
  dataTable.addColumn({type: 'string', role: 'tooltip'}); // A column for custom tooltip content

  lineOptions = {
    title : 'Power over the Last 24 Hours',
    titleTextStyle: {fontName: 'Bebas', fontSize: 24, bold: true},
    height: 300,
    animation: {
      duration:2000,
      easing: 'linear'
    },
    legend: 'none',
    colors:['#DF7401'],
    hAxis: {title:"Time", viewWindow: {min:0, max:5}, titleTextStyle: {italic: false}},
    vAxis: {title: "Kilowatt", viewWindow: {min:0, max:55}, titleTextStyle: {italic: false}}
  };

  updateLineChartData();
  chart = new google.visualization.AreaChart(document.getElementById('animated_chart'));
  chart.draw(dataTable, lineOptions);

  counter = lineOptions.hAxis.viewWindow.max;
  looper = setInterval(function(){
    counter++;
    move(1,1);
  }, delay);
}

// gets the data from the php
function getLineChartData(energyRate, weatherStrings, timeStamp, temperature){
  var j = 0;
  for (var i = MAX-1; i >= 0; i--) {
    kW[j] = energyRate[i];
    weather[j] = weatherStrings[i];
    time2[j] = timeStamp[i];
    temp[j] = temperature[i];
    j++;
  }
}

// updates the data in the chart
function updateLineChartData(){
  for (var i = 0; i < MAX; i++) {
    dataTable.addRow( [ time2[i].substring(5, 10) + ' at ' + time2[i].substring(11, 16), parseFloat(kW[i]), 
                      parseFloat(kW[i]) + ' kW' + '\n' + temp[i] + '\xB0F: ' + weather[i] ] );
  }  
}

// animates the chart based on min and max
function move(min, max){
  if (counter <= 0 ){
    lineOptions.hAxis.viewWindow.min = MAX-4;
    lineOptions.hAxis.viewWindow.max = MAX+1;
    counter= lineOptions.hAxis.viewWindow.max-1;
  } else if (counter >= MAX ){
    lineOptions.hAxis.viewWindow.min = -1;
    lineOptions.hAxis.viewWindow.max = 4;
    counter= lineOptions.hAxis.viewWindow.max;
  }
  lineOptions.hAxis.viewWindow.min += min;
  lineOptions.hAxis.viewWindow.max += max;
  chart.draw(dataTable, lineOptions);
}

// pauses the chart movement
function pause(){
  $('#pauseButton').toggleClass("glyphicon-pause").toggleClass("glyphicon-play");
  if (paused){
    paused = false; 
    $("#forwardButton").prop("disabled",false);
    $("#backwardButton").prop("disabled",false);
    forward();
  }
  else {
    paused = true;
    $("#forwardButton").prop("disabled",true);
    $("#backwardButton").prop("disabled",true);
    clearInterval(looper)    
  }
}

// moves chart forward
function forward(){
  clearInterval(looper);
  counter = lineOptions.hAxis.viewWindow.max;
  move(1,1);
  looper = setInterval(function(){
    counter++;
    move(1,1);
  }, delay);
}

// moves chart backwards
function backward(){
  clearInterval(looper);
  counter = lineOptions.hAxis.viewWindow.min;
  move(-1,-1);
  looper = setInterval(function(){
    counter--;
    move(-1,-1);
  }, delay);
}
