/* 
 * Adds the Weather Underground info to the index page
 */

jQuery(document).ready(function ($) {
    $.ajax({
        url: "http://api.wunderground.com/api/af46457a3c3fef33/geolookup/conditions/q/LA/Hammond.json",
        dataType: "jsonp",
        success: function (parsed_json) {
            var location = parsed_json['location']['city'];
            var temp_f = parsed_json['current_observation']['temp_f'];
            var weather = parsed_json['current_observation']['icon'];
            var icon = parsed_json['current_observation']['icon_url'];
            $("#weather").text( location + ": " + temp_f +'\xB0' + "F "+ ": " + weather.charAt(0).toUpperCase() + weather.slice(1) + " " );

            var weatherIcon = document.createElement("img");
            $(weatherIcon).attr('src', icon).load(function(){ this.width; });
            $("#weather").append(weatherIcon);
        }
    });
});