$(document).ready(function() {
    $("#submitUserZip").on("click", function(event) {
        event.preventDefault();

            //takes user input and stores to a variable
            var addressSearch = $("#userZip").val().trim();
                console.log(addressSearch);

        //api call using addressSearch variable
        var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + addressSearch + "&key=AIzaSyBZw2ShFmo3JR1jLQphkhTBOGApykwgnR8";
        
        //location emptied so location output doesnt stack after multiple searches
        $("#searchLocation").empty();
        $("#cardLoop").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //gets full body api response of the address searched
        request = response.body;
        console.log(response);
        //parses address field so you can see city, state, zip searched
        var normalizedAddress = 
                response.normalizedInput.line1 + ' ' +
                response.normalizedInput.city + ', ' +
                response.normalizedInput.state + ' ' +
                response.normalizedInput.zip;

            //appends the address to the page
            var searchLocation = '<p id="searchResults">Search results for: ' + normalizedAddress + '</p>';

            $("#searchLocation").append(searchLocation);

            //for loop to create cards for all officials in array
            for (i=0; i<response.officials.length; i++) {
 
            // var office = response.offices[i].name;

            var photo = response.officials[i].photoUrl;
                               
                if(photo == null) {
                    photo = "https://www.coxblue.com/wp-content/uploads/2018/01/no-user-image-square.jpg";
                }

            var name = response.officials[i].name;

                if(name == null) {
                    name = "N/A";
                }

            var party = response.officials[i].party;
            
            var phone;

                if(!Array.isArray(response.officials[i].phones) || !response.officials[i].phones.length) {
                    website = "#";
                } else {
                    phone = response.officials[i].phones[0];
                };

            var website;

                if(!Array.isArray(response.officials[i].urls) || !response.officials[i].urls.length) {
                     website = "#";
                } else {
                    website = response.officials[i].urls[0];
                };
             
            var card =
                '<div class="card" style="width: 18rem;">' +
                '<div class ="card-body">' +
                '<h5 class="card-title" id="FILLINLATER"><h5>' +
                '</div>' +
                '<img class="card-img-top" id="picture" src="' + photo + '">' +
                '<ul class="list-group list-group-flush">' +
                '<li class="list-group-item" id="' + name + '">' + name + '</li>' +
                '<li class="list-group-item" id="' + party + '">Political Party: ' + party + '</li>' +
                '<li class="list-group-item" id="' + phone + '">Phone Number: ' + phone + ' </li>' +
                '</ul>' +
                '<div class="card-body">' +
                '<a class="card-link" href="' + website + '"target="_blank">Official Website</a>' +
                '</div>' +
                '</div>';

        $("#cardLoop").append(card);
            }
        })
    })
})