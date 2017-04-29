$(document).ready(function() {

    const key = "";

    let currentWeather = [""];
    let forecast = [""];

    const validateZip = enteredZip => {
        if (enteredZip.length == 5) {
            console.log("zip is valid");
            dataGetter(enteredZip);
        } else {
            console.log("INVALID");
        }
    };

    $(".submit").submit((e) => {
        e.preventDefault();
    });

    // Listeners
    $("#textInput").keyup((event) => {
        if (event.which == 13) {
            var enteredZip = $("#textInput").val();
            validateZip(enteredZip);
        }
    });

    $("#searchIcon").click(() => {
        var enteredZip = $("#textInput").val();
        validateZip(enteredZip);
    });

    const writeCurrentWeather = (currentData) => {
        let string = "";

        $("#zipArea").html(`<h1>${currentData.name}<h1>`);

        string += `<div class="col-md-12">
        		   <div class="thumbnail">
        		   <p>Temperature: ${currentData.main.temp}<p>
    			   <p>Conditions: ${currentData.weather[0].description}</p>
    			   <p>Air Pressure: ${currentData.main.pressure}</p>
    			   <p>Temperature: ${currentData.wind.speed}</p>
    			   <a href="#">Click for Forecast</a>
    			   </div>
    			   </div>`;
        $("#weather").html(string);

    };

    const writeForecast = (forecastData) => {

    };

    const loadCurrentWeather = (zip) => {
        return new Promise((resolve, reject) => {
            $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${key}`)
                .done((data) => resolve(data))
                .fail((error) => reject(error));
        });
    };

    const loadForecast = (zip) => {
        return new Promise((resolve, reject) => {
            $.ajax(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip},us&units=imperial&APPID=${key}`)
                .done((data) => resolve(data))
                .fail((error) => reject(error));
        });
    };

    const dataGetter = (enteredZip) => {
        Promise.all([loadCurrentWeather(enteredZip), loadForecast(enteredZip)])
            .then(result => {
                currentWeather = result[0];
                forecast = result[1];
                writeCurrentWeather(currentWeather);
                console.log(currentWeather, forecast);
            })
            .catch(error => {
                console.log(error);
            });
    };
}); //End $(doc).ready
