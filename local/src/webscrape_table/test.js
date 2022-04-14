//node .\test.js

console.log("starting");
var http = require("http");

// var options = {
//     host: 'www.morningstar.com.au',
//     port: 80,
//     path: '/Stocks/CompanyHistoricals/CAR'
// };

var options = {
    host: 'www.morningstar.com.au',
    port: 80,
    path: '/Stocks/CompanyHistoricals/CAR'
};

http.get(options, function(res) {
    console.log("Got response: " + res.statusCode);
    console.log({ res });

}).on('error', function(e) {
    console.log("Got error: " + e.message);
});