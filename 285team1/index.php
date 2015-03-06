<html>
  <head>

    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <link rel = "stylesheet" type = "text/css" href="css/site.css">
    <link rel = "stylesheet" type = "text/css" href="css/home.css">
    <title>Home</title>

	</head>

	<body >

    <nav class="navbar navbar-default navbar-fixed-top" id="top" role="navigation">
      <div class="container">
        <ul class="nav navbar-nav">
          <li class="active"><a href="index.php">Home</a></li>
          <li><a href="diagram.html">Diagram</a></li>
          <li><a href="southeastern.html">Southeastern</a></li>
        </ul>
      </div>
    </nav>

    <div class = "col-xs-1 back"></div>

    <div class = "col-xs-10">
      <div class="mainBody container-fluid" >

        <!--Section 2 Quick intro info + picture stuff-->
        <div class="row rowImg">
          <div class="col-sm-12 colInfo1">
            <div class ="row fixIt">
              <p><span style="font-family:Bebas; font-size: 40px;">Southeastern Solar Thermal Dashboard</span></p>
              <p><span style = "font-family:Roboto; font-size: 21px;">Welcome to the Southeastern Louisiana University Solar Dashboard. We are committed to creating
              a fully self-sustaining university. Here we have data collected from the solar thermal installation on the Kinesiology building on our campus. 
              See for yourself how efficient the panels are, learn more about the technology, and find out what you can do to get involved!</span></p><br>
            </div>
          </div>
        </div>

        <div class="container-fluid" >
          <div class="row">
            <div class="col-sm-4">
              <h3>kWh Produced Today:</h3>
              <p class="weMadeIt" >Our goal is to produce at least 100 kWh of energy per day.</p>
              <div align="center" id="chartgauge_div"></div>
              <p id="weather" class="weMadeIt"></p>
              <img src="images/wundergroundLogo_4c_horz" alt="Weather Underground" width="200" height="48" />
            </div>
            <div class="col-sm-8">
              <div id="animated_chart"></div>
              <br>
	      <div class="center">
                <button id="forwardButton" type="button" class="btn-sm btn-default" onclick="backward()" aria-label="Backward">
                    <i class="glyphicon glyphicon-chevron-left" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn-sm btn-default" onclick="pause()" aria-label="Pause">
                    <i id="pauseButton" class="glyphicon glyphicon-pause" aria-hidden="true"></i>
                </button>
                <button id="backwardButton" type="button" class="btn-sm btn-default" onclick="forward()" aria-label="Forward">
                    <i class="glyphicon glyphicon-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Button stuff -->
        <div class="row">
          <div class="col-sm-4 btn-container" style="font-family:Bebas;">
            <h3>Convert Energy Total to:</h3>
            <button type="button" id="flash" class="btn btn-success btn-lg col-sm-6">
              <span class="glyphicon glyphicon-flash" aria-hidden="true"></span> kWh
            </button>
            <button type="button" id="tree" class="btn btn-success btn-lg col-sm-6">
              <span class="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span> Trees
            </button>
            <button type="button" id="carbon" class="btn btn-success btn-lg col-sm-6">
              <span class="glyphicon glyphicon-globe" aria-hidden="true"></span> Carbon
            </button>
            <button type="button" id="gas" class="btn btn-success btn-lg col-sm-6">
              <span class="glyphicon glyphicon-tint" aria-hidden="true"></span> Gas
            </button>
            <button type="button" id="hours" class="btn btn-success btn-lg col-sm-6">
              <span class="glyphicon glyphicon-phone" aria-hidden="true"></span> Battery
            </button>
            <button type="button" id="money" class="btn btn-success btn-lg col-sm-6">
              <span class="glyphicon glyphicon-usd" aria-hidden="true"></span> Dollars
            </button>
            <p id="textContainer" class="weMadeIt">we made it</p>
          </div>
          <!--End Button Stuff -->
          <div class= "col-sm-8">
            <div id="chart_div"></div>
          </div>
        </div>
      </div>
    </div> <!--end of col-xs-10-->

    <div class="col-xs-1 back"></div>

      <div class="col-sm-12 ">
        <p class="weMadeIt white"><a href="contact.html"><b>Contact</a> Team Solis 2014</b></p>
      </div>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://www.google.com/jsapi"></script>

    <script src="js/barChart.js"></script>
    <script src="js/weatherData.js"></script>
    <script src="js/gauges.js"></script>
    <script src="js/lineChart.js"></script>

    <?php 
      include 'PHP/current_kWh.php';  
      include 'PHP/BarChartData.php'; 
      include 'PHP/LineChartData.php';
    ?>
    <script type="text/javascript" >
      $(function(){
        getGaugeData( <?php echo json_encode($kWh) ?> ); 
        getBarChartData(
          <?php 
            echo json_encode($LastTenEnergyReadings);
          ?>,<?php 
            echo json_encode($DateRead);
          ?> );
        getLineChartData(
          <?php
            echo json_encode($hourlyEnergyRate);
          ?>,<?php
            echo json_encode($weather);
          ?>,<?php
            echo json_encode($time);
          ?>,<?php
            echo json_encode($temp);
          ?> );
      });
    </script>

  </body>
</html>
