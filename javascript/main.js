$(document).ready(function() {
	
    const key = "";
        
    const validateZip = enteredZip => {
        if (enteredZip.length == 5) {
            console.log("zip is valid");
        } else {
            console.log("INVALID");
        }
    };

    // Listeners
    $("#textInput").keyup(event => {
        if (event.which == 13) {
            var enteredZip = $("#textInput").val();
            validateZip(enteredZip);
        }
    });
    $("#searchIcon").click(() => {
        var enteredZip = $("#textInput").val();
        validateZip(enteredZip);
    });

    const loadCurrent = path => {
        // Creates a new Promise with any filepath
        return new Promise((resolve, reject) => {
            $.ajax(path)
                .done(data1 => {
                    resolve(data1);
                })
                .fail(error => {
                    reject(error);
                });
        });
    };

    const dataGetter = input => {
        Promise.all([dataCall(input)])
            .then(result => {
                //array = result[i].something
                // writeDOM
            })
            .catch(error => {
                console.log(error);
            });
    };
}); //End $(doc).ready
