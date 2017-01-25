'use strict';

var Stocks = require('../models/stocks.js');
// var getJSON = require('get-json');
// var getJSON = require('simple-get-json');
var getJSON = require("jsonrequest");

var appUrl = process.env.APP_URL

function StockHandler() {

  this.getStocks = function (req, res) {

    Stocks
      .find()
      .exec(function (err, result) {
        if (err) { throw err; }
        if (result) {
          res.json(result);
        }
      });

  };

  this.addStock = function (req, res) {
    var stockCode = req.body.stockCode.toUpperCase();

    Stocks
      .findOne( { 'code': stockCode })
      .exec(function(err, doc) {
        if (err) {
          res.send(null, 500);
        }
        else if (doc) {
          // If stock already exists in DB, don't add it again
          res.json("Exists");
        }
        else {
          // Add stock to DB

          // Use Date() to get today's date
          var today = new Date();
          var year = today.getFullYear();
          var month = today.getMonth() + 1;
          var day = today.getDate();

          var startDate = year - 1 + '-' + month + '-' + day;
          var endDate = year + '-' + month + '-' + day;
          var apiKey = process.env.QUANDL_API_KEY;

          var quandlApiUrl = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stockCode + '.json?api_key=' + apiKey + '&start_date=' + startDate + '&end_date=' + endDate;

          getJSON(quandlApiUrl, function (err, data) {

            if (data.quandl_error) {
              // Send error reponse back to server
              console.log("Error....");
              res.json("Error");
            }
            else {
              var name = data.dataset.name;
              var stockData = data.dataset.data;
              var relevantDataArr = [];
              
              for (var i = stockData.length - 1; i >= 0; i--) {
                var indivDate = stockData[i][0];
                var unixTime = new Date(indivDate).getTime();
                var endPrice = stockData[i][4];

                relevantDataArr.push([unixTime, endPrice]);
              }

              // Add stock to database
              var newStock = new Stocks();
              newStock.code = stockCode;
              newStock.name = name;
              newStock.data = relevantDataArr;

              newStock.save(function(err, doc) {
                if (err) {
                  res.send(null, 500);
                }

                res.send(newStock);

              })
            }
          });
        }
      });
    
  };

  this.deleteStock = function (req, res) {
    
    var stockCode = req.body.stockCode;

    Stocks
      .findOne({ 'code': stockCode })
      .exec(function(err, doc) {
        if (err) {
          res.send(null, 500);
        }
        else {
          doc.remove()
          res.json(stockCode + ' successfully removed.');
        }
      })
      
  };

  
}

module.exports = StockHandler;