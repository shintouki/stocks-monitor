'use strict';

var Stocks = require('../models/stocks.js');

var appUrl = process.env.APP_URL

function StockHandler() {
  
  this.stockSearch = function(req, res) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    var stockCode = 'GOOG';
    var startDate = year + '-' + month + '-' + day;
    var endDate = year - 1 + '-' + month + '-' + day;
    var apiKey = process.env.QUANDL_API_KEY

    var quandlApiUrl = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stockCode + '.json?api_key=' + apiKey + '&start_date=' + startDate + '&end_date=' + endDate;
    $.getJSON(quandlApiUrl, function (data) {
      
      console.log(data);
    });


  }
  
}

module.exports = StockHandler;