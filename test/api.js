let google_civicinfo = require('@datafire/google_civicinfo').create();
 

var key = "AIzaSyBZw2ShFmo3JR1jLQphkhTBOGApykwgnR8";

// google_civicinfo.representatives.representativeInfoByAddress({
// "key" : key,
// "address": "11218"

// }).then(data => {
//   console.log(data);
// });

// google_civicinfo.elections.electionQuery({
//     "key" : key,
// }).then(data => {
//     console.log(data);
// });


// google_civicinfo.representatives.representativeInfoByDivision({
//     "key" : key,
//     "address": "11218",
//     "ocdId": "country:us"
// }).then(data => {
//     console.log(data);
// });

google_civicinfo.elections.voterInfoQuery({
    "key" : key,
    "address": "564 East 4th ST Brooklyn NY 11218",
    "electionId": "6000"
  }).then(data => {
    console.log(data);
});