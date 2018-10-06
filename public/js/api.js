
        
    var map;

    
   

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    key = "AIzaSyBZw2ShFmo3JR1jLQphkhTBOGApykwgnR8";

    $("#submitUserZip").on("click", function (event) {
        event.preventDefault();

        //takes user input and stores to a variable
        var addressSearch = $("#userZip").val().trim();
        console.log(addressSearch);

        //api call using addressSearch variable
        var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + addressSearch + "&key=" + key;

        //location emptied so location output doesnt stack after multiple searches
        $("#searchLocation").empty();
        $("#cardLoop").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
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
            for (i = 0; i < 8; i++) {

                // var office = response.offices[i].name;

                var photo = response.officials[i].photoUrl;

                if (photo == null) {
                    photo = "https://www.coxblue.com/wp-content/uploads/2018/01/no-user-image-square.jpg";
                }

                var name = response.officials[i].name;

                if (name == null) {
                    name = "N/A";
                }

                var party = response.officials[i].party;

                var phone;

                if (!Array.isArray(response.officials[i].phones) || !response.officials[i].phones.length) {
                    website = "#";
                } else {
                    phone = response.officials[i].phones[0];
                };

                var website;

                if (!Array.isArray(response.officials[i].urls) || !response.officials[i].urls.length) {
                    website = "#";
                } else {
                    website = response.officials[i].urls[0];
                };

                var card =
                    '<div class = "col-md-4 pb-3 text-center">' + '<div class="card" style="width: 18rem;">' +
                    '<div class ="card-body">' +
                    '<h5 class="card-title" id="FILLINLATER"><h5>' +
                    '</div>' +
                    '<img class="card-img-top" width="286" height="286" id="picture" src="' + photo + '">' +
                    '<ul class="list-group list-group-flush">' +
                    '<li class="list-group-item" id="' + name + '">' + name + '</li>' +
                    '<li class="list-group-item" id="' + party + '">Political Party: ' + party + '</li>' +
                    '<li class="list-group-item" id="' + phone + '">Phone Number: ' + phone + ' </li>' +
                    '</ul>' +
                    '<div class="card-body">' +
                    '<a class="card-link" href="' + website + '"target="_blank">Official Website</a>' +
                    '</div>' +
                    '</div>' + '<button class="btn peach-gradient btn-rounded ">save</button>' + '</div>';

                $("#cardLoop").append(card);
            }
        })
    })

    var gMaps;
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: 40.730610, lng: -73.935242}
        });
        var geocoder = new google.maps.Geocoder();
            gMaps;
       

            $("#userAddressSubmit").on("click", function (event) {
                event.preventDefault();
                var addressSearch = $("#userAddress").val().trim();
                console.log(addressSearch);
        
                //api call using addressSearch variable
                var polls = "https://www.googleapis.com/civicinfo/v2/voterinfo";
                polls += '?' + $.param({
                'address': addressSearch,
                'electionId': 6000,
                'key': "AIzaSyBZw2ShFmo3JR1jLQphkhTBOGApykwgnR8",
        });
                //location emptied so location output doesnt stack after multiple searches
                $("#location").empty();
                $("#searchLocation2").empty();
        
                $.ajax({
                    url: polls,
                    method: "GET"
                }).then(function (response) {
                    //gets full body api response of the address searched
                    request = response.body;
                    console.log(response.pollingLocations[0].address);
                    //parses address field so you can see city, state, zip searched
                    var normalizedAddress =
                        response.normalizedInput.line1 + ' ' +
                        response.normalizedInput.city + ', ' +
                        response.normalizedInput.state + ' ' +
                        response.normalizedInput.zip;
        
                    //appends the address to the page
                    var searchLocation = '<p id="searchResults">Search results for: ' + normalizedAddress + '</p>';
        
                    $("#searchLocation2").append(searchLocation);
                    
        
                    var name = response.pollingLocations[0].address.locationName
                    var street = response.pollingLocations[0].address.line1
                    var state = response.pollingLocations[0].address.state
                    var zip = response.pollingLocations[0].address.zip
                    var city = response.pollingLocations[0].address.city
                    gMaps = street+' '+state+' '+city+' '+zip;
                    var poll ='<p><strong> Your polling location is located at: <strong></p>' +'<p>'+name+'</p>'+'<p>'+street+'</p>'+'<p>'+city+'</p>'+'<p>'+state+'</p>'+'<p>'+zip+'</p>'
                    $("#location").append(poll);
        
                     
                       
                       
                    geocodeAddress(geocoder, map);
                })
            
                
            })




          
    
      }

      function geocodeAddress(geocoder, resultsMap) {
        var address = gMaps;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }













    $("#userAddressSubmit2").on("click", function (event) {
        event.preventDefault();
        
        
        var Louisiana = '<h3 class="text-center mb-3 mt-3"> Candidates for U.S. House Louisiana District 2</h3>'+
        '<div class="row">'+
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/58358.jpg">' + '<a href="https://ballotpedia.org/Cedric_Richmond"target="_blank">Cedric Richmond (D) (Incumbent)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/174293.jpg">'+ '<a href="https://ballotpedia.org/Belden_Batiste"target="_blank">Belden Batiste </a> </img>'+'</div>'+
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/173931.jpg">'+ '<a href="https://ballotpedia.org/Shawndra_Rodriguez"target="_blank">Shawndra Rodriguez </a> </img>'+'</div>'+
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/173968.jpg">'+ '<a href="https://ballotpedia.org/Jesse_Schmidt"target="_blank">Jesse Schmidt </a> </img>'+'</div>'+'</div>'+
        '<h3 class="text-center mb-3 mt-3"> Candidates for Louisiana Secretary of State</h3>'+
        '<div class="row">'+
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/174572.jpg">' + '<a href="https://ballotpedia.org/Gwen_Collins-Greenup"target="_blank">Gwen Collins-Greenup (D)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://cdn.ballotpedia.org/images/8/89/Placeholder_image.png">' + '<a href="https://ballotpedia.org/Renee_Fontenot_Free"target="_blank">Renee Fontenot Free (D)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/71017.jpg">' + '<a href="https://ballotpedia.org/Julie_Stokes"target="_blank">Julie Stokes (R) </a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://cdn.ballotpedia.org/images/8/89/Placeholder_image.png">' + '<a href="https://ballotpedia.org/Kyle_Ardoin"target="_blank">Kyle Ardoin (R) (Incumbent)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://cdn.ballotpedia.org/images/8/89/Placeholder_image.png">' + '<a href="https://ballotpedia.org/Heather_Cloud"target="_blank"> Heather Cloud (R)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/53981.jpg">' + '<a href="https://ballotpedia.org/A.G._Crowe"target="_blank">A.G. Crowe (R)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/172409.jpg">' + '<a href="https://ballotpedia.org/Rick_Edmonds"target="_blank">Rick Edmonds (R)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://cdn.ballotpedia.org/images/8/89/Placeholder_image.png">' + '<a href="https://ballotpedia.org/Thomas_Kennedy_III"target="_blank">Thomas Kennedy III (R)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://cdn.ballotpedia.org/images/8/89/Placeholder_image.png">' + '<a href="https://ballotpedia.org/Matthew_Moreau"target="_blank">Matthew Moreau</a>'+'</img>'+ '</div>'+'</div>';
        
        var Georgia = 
        '<h3 class="text-center mb-3 mt-3"> Candidates for Governor of Georgia </h3>'+
        '<div class="row">'+
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/83117.jpg">' + '<a href="https://ballotpedia.org/Stacey_Abrams"target="_blank">Stacey Abrams (D)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/57408.png">' + '<a href="https://ballotpedia.org/Brian_Kemp"target="_blank">Brian Kemp (R)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/171751.jpg">' + '<a href="https://ballotpedia.org/Ted_Metz"target="_blank">Ted Metz (L)</a>'+'</img>'+ '</div>' +'</div>'+
        '<h3 class="text-center mb-3 mt-3"> Candidates for Georgia Secretary of State </h3>'+
        '<div class="row">'+
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/69221.jpg">' + '<a href="https://ballotpedia.org/John_Barrow"target="_blank">John Barrow (D)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/57055.jpg">' + '<a href="https://ballotpedia.org/Brad_Raffensperger"target="_blank">Brad Raffensperger (R)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/172848.jpg">' + '<a href="https://ballotpedia.org/Smythe_DuVal"target="_blank">Smythe DuVal (L)</a>'+'</img>'+ '</div>' +'</div>'+
        '<h3 class="text-center mb-3 mt-3">Candidates for Attorney General of Georgia</h3>'+
        '<div class="row">'+
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/173538.PNG">' + '<a href="https://ballotpedia.org/Charlie_Bailey"target="_blank">Charlie Bailey (D)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/93676.jpg">' + '<a href="https://ballotpedia.org/Chris_Carr_(Georgia)"target="_blank">Chris Carr (R) (Incumbent)</a>'+'</img>'+ '</div>' + '</div>'+
        '<h3 class="text-center mb-3 mt-3">Candidates for Attorney General of Georgia</h3>'+
        '<div class="row">'+
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/162161.jpg">' + '<a href="https://ballotpedia.org/Sarah_Riggs_Amico"target="_blank">Sarah Riggs Amico (D)</a>'+'</img>'+ '</div>' +
        '<div class = "col-md-4 ">'+'<img src="https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/64809.jpg">' + '<a href="https://ballotpedia.org/Geoff_Duncan"target="_blank">Geoff Duncan (R)</a>'+'</img>'+ '</div>' + '</div>';
        
        if ($("#userAddress2").val() == "30318" ){
            $("#candidatesSearch").empty()
            $("#candidatesSearch").append(Georgia);

        } else if ($("#userAddress2").val() == "70116" ){
            $("#candidatesSearch").empty()
            $("#candidatesSearch").append(Louisiana);
        }
        
        
        
        
    });
        

