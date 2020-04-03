
var weatherpics = {
    "drizzle":"background-image: url('https://aminus3.s3.amazonaws.com/image/g0002/u00001477/i01978138/e2f130ab102b98ac8e0c10b5ffef3fb9_giant.jpg')",
    "clouds":"background-image: url('https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/12/2016/01/16578.jpg')",
    "rain":"background-image: url('https://cdn.pixabay.com/photo/2017/09/17/23/09/rainbow-2760167_960_720.jpg')",
    "snow":"background-image: url('https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/H0MA-uKSipsekm5s/calm-rural-winter-landscape-with-cozy-snow-covered-township-and-snowy-firs-under-dark-night-sky-at-slight-snowfall-3d-animation-rendered-in-4k_bydknjfee_thumbnail-full01.png')",
    "clear":"background-image: url('https://renatures.com/wp-content/uploads/2017/03/sky-nature-landscape-landscap-wallpaper-sunset.jpg')",
    "thunderstorm":"background-image: url('https://www.geico.com/more/wp-content/uploads/geico-more-Thunderstorms-post-2016.jpg')",
}

$(document).ready(load);
var celsius = true;
var temperature = 0;
var degree = "C";

function load() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(continueLoad);
    }
    else {
        $("h2").html("Location: GeoLocation is not supported by this browser");
    }
    $("#temp").click(switchDegrees);
}

function continueLoad(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    console.log("longitude: " + longitude);
    console.log("latitude: " + latitude);
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
    
      $.ajax({url: "https://fcc-weather-api.glitch.me/api/current?lat="+latitude+"&lon="+longitude,
          success: function(result) {
              console.log(result);
              celsius = true;
              var weather = result.weather[0].main
              temperature = result.main.temp
              $("h2").html("Location: " + result.name);
              $("body").attr("style", getPic(weather));
              updateTemperature();
          },
             }).done(function() {
              console.log("done");
      });   
  }

  function switchDegrees() {
    if(celsius) {
        temperature = temperature * 1.8 + 32;
        degree="C";
    }
    else {
        temperature = (temperature - 32) * (5.0/9.0);
        degree="F";
    }
    celsius = !celsius;
    updateTemperature()
  }

  function updateTemperature() {
    $("#temp").html(temperature + "&deg;"+degree);
  }

  function getPic(weather) {
      var val = weatherpics.clouds;
      switch (weather.toLowerCase()) {
          case "clouds":
            val = weatherpics.clouds;
            break;
          case "drizzle":
            val = weatherpics.drizzle;
            break;
          case "rain":
            val = weatherpics.rain;
            break;
          case "snow":
            val = weatherpics.snow;
            break;
          case "clear":
            val = weatherpicps.clear;
            break;
          case "thunderstorm":
            val = weatherpics.thunderstorm;
            break;
          default:
            val = weatherpics.clouds;
      }
      return val;
  }
