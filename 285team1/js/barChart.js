/* Bar Chart JavaScript
 * Used on the index page
 * Gets data from BarChartData.php
 * Shows kWh generated over the previous 10 days
 */

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(displaykWh);

var data1 = [];
var kWh = [];
var ikWh = []; // store initial values
var time1 = [];
var unit = null;

function drawVisualization(options) {

  var barTable = new google.visualization.DataTable();
  barTable.addColumn('string', '');
  barTable.addColumn('number', '');

  // A column for custom tooltip content
  barTable.addColumn({type: 'string', role: 'tooltip'});

  barTable.addRows(data1);

  var chart2 = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart2.draw(barTable, options);
    
  document.getElementById("flash").addEventListener("click", displaykWh, false);
  document.getElementById("tree").addEventListener("click", displayTrees, false);
  document.getElementById("hours").addEventListener("click", displayHours, false);
  document.getElementById("carbon").addEventListener("click", displayCarbon, false);
  document.getElementById("gas").addEventListener("click", displayGas, false);
  document.getElementById("money").addEventListener("click", displayMoney, false);
}

// Gets data from the php file
function getBarChartData(energyTotal, timeStamp){
  var j = 0;
  for (var i = 9; i >= 0; i--) {
    ikWh[j] = energyTotal[i];
    time1[j] = timeStamp[i];
    j++;
  }
  updateBarChartData();
}

function updateBarChartData(){
  for (var i = 0; i < 10; i++) {
    data1[i] = [ time1[i].substring(5, 10), parseFloat(kWh[i]), time1[i].substring(5, 10) + '\n' + unit + parseFloat(kWh[i]).toFixed(2) ];
  }
}

// return to kWh
function displaykWh(){
  $('#textContainer').text("Kilowatt-hours are a measurement of energy.");
  
  for (var i = 0; i < ikWh.length; i++) {
    kWh[i] = ikWh[i];
  }
  unit = 'kWh: ';
  updateBarChartData();

  var options = {
    title : 'Energy Total Produced',
    titleTextStyle: {fontName: 'Bebas', fontSize: 24, bold: true},
    vAxis: {title: "Killowatt-hours", titleTextStyle: {italic: false}},
    hAxis: {title: "Day", titleTextStyle: {italic: false}},
    legend: 'none'
  }

  drawVisualization(options);
}

//Trees Button
function displayTrees(){
  $('#textContainer').text("It takes fifty-five kWhs to have the same carbon offset of one tree!");
  
  for (var i = 0; i < ikWh.length; i++) {
    kWh[i] = ikWh[i];
  }
  for (var i = 0; i < kWh.length; i++) {
    kWh[i] *= .018;
  }
  unit = 'Trees: ';
  updateBarChartData();

  var options = {
    title : "Trees Saved",
    titleTextStyle: {fontName: 'Bebas', fontSize: 24, bold: true},
    vAxis : {title:"Trees", titleTextStyle: {italic: false}},
    hAxis : {title:"Day", titleTextStyle: {italic: false}},
    legend : 'none'
  }

  drawVisualization(options);
}

//Carbon Button
function displayCarbon(){
  $('#textContainer').text("Carbon offset measures a reduction in carbon emissions in metric tons.");
  
  for (var i = 0; i < ikWh.length; i++) {
    kWh[i] = ikWh[i];
  }
  for (var i = 0; i < kWh.length; i++) {
    kWh[i] *= 0.00069;
  }
  unit = 'Offset: ';
  updateBarChartData();

  var options = {
    title : "Carbon Offset",
    titleTextStyle: {fontName: 'Bebas', fontSize: 24, bold: true},
    vAxis : {title:"Metric tons of Carbon", titleTextStyle: {italic: false}},
    hAxis : {title:"Day", titleTextStyle: {italic: false}},
    legend : 'none'
  }

  drawVisualization(options);
}

//Phone Button
function displayHours(){
  $('#textContainer').text("Three kWhs can power the iPhone 5 for a whole year!");
  
  for (var i = 0; i < ikWh.length; i++) {
    kWh[i] = ikWh[i];
  }
  for (var i = 0; i < kWh.length; i++) {
    kWh[i] *= 8765.81;
  }
  unit = 'Hours: ';
  updateBarChartData();

  var options = {
    title : "Phone Battery Hours",
    titleTextStyle: {fontName: 'Bebas', fontSize: 24, bold: true},
    vAxis : {title:"Hours", titleTextStyle: {italic: false}},
    hAxis : {title:"Day", titleTextStyle: {italic: false}},
    legend : 'none'
  }

  drawVisualization(options);
}

//Gas Button
function displayGas(){
  $('#textContainer').text("Gas isn't cheap, luckily using a solar thermal system reduces our need for it.");
  
  for (var i = 0; i < ikWh.length; i++) {
    kWh[i] = ikWh[i];
  }
  for (var i = 0; i < kWh.length; i++) {
    kWh[i] *= 0.078;
  }
  unit = 'Gallons: ';
  updateBarChartData();

  var options = {
    title : "Equivalence of Gasoline",
    titleTextStyle: {fontName: 'Bebas', fontSize: 24, bold: true},
    vAxis : {title:"Gallons of Gasoline", titleTextStyle: {italic: false}},
    hAxis : {title:"Day", titleTextStyle: {italic: false}},
    legend : 'none'
  }

  drawVisualization(options);
}

// Money Buttton
function displayMoney(){
  $('#textContainer').text("Universities often have tight budgets; solar panels can help save them money.");
  
  for (var i = 0; i < ikWh.length; i++) {
    kWh[i] = ikWh[i];
  }
  for (var i = 0; i < kWh.length; i++) {
    kWh[i] *= .089;
  }
  unit = '$';
  updateBarChartData();

  var options = {
    title : "Money Saved",
    titleTextStyle: {fontName: 'Bebas', fontSize: 24, bold: true},
    vAxis : {title:"Dollars $", titleTextStyle: {italic: false}},
    hAxis : {title:"Day",titleTextStyle: {italic: false}},
    legend : 'none'
  }

  drawVisualization(options);
}
