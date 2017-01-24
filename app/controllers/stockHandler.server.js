'use strict';

var Stocks = require('../models/stocks.js');
// var $ = require('jquery');
var getJSON = require('get-json');

var appUrl = process.env.APP_URL

// var getJSON = function(url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.open("get", url, true);
//     xhr.responseType = "json";
//     xhr.onload = function() {
//       var status = xhr.status;
//       if (status == 200) {
//         callback(null, xhr.response);
//       } else {
//         callback(status);
//       }
//     };
//     xhr.send();
// };

function StockHandler() {
  
  this.stockSearch = function(req, res) {
    console.log("in stock search");
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    var stockCode = 'GOOG';
    var startDate = year - 1 + '-' + month + '-' + day;
    var endDate = year + '-' + month + '-' + day;
    var apiKey = process.env.QUANDL_API_KEY

    var quandlApiUrl = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stockCode + '.json?api_key=' + apiKey + '&start_date=' + startDate + '&end_date=' + endDate;
    // console.log(quandlApiUrl);
    getJSON(quandlApiUrl, function (err, data) {
      if (err) {
        console.log("Error");
      }
      else {
        // console.log(data);
        
      }
      
    });


  }
  
}

module.exports = StockHandler;