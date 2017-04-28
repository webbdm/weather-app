$(document).ready(function() {

    const key = "";

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
    $("#textInput").keyup(event => {
        if (event.which == 13) {
            var enteredZip = $("#textInput").val();
            validateZip(enteredZip).then((result) => {

            });
        }
    });
    $("#searchIcon").click(() => {
        var enteredZip = $("#textInput").val();
        validateZip(enteredZip);
    });

    const currentWeather = (zip) => {
        return new Promise((resolve, reject) => {
            $.ajax(`api.openweathermap.org/data/2.5/weather?zip=${zip},us`)
                .done((data) => resolve(data.results))
                .fail((error) => reject(error));
        });
    };

    const forecast = (zip) => {
        return new Promise((resolve, reject) => {
            $.ajax(`api.openweathermap.org/data/2.5/forecast/daily?zip=${zip},us`)
                .done((data) => resolve(data.results))
                .fail((error) => reject(error));
        });
    };

    const dataGetter = (enteredZip) => {
        Promise.all([currentWeather(enteredZip), forecast(enteredZip)])
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    };
}); //End $(doc).ready
