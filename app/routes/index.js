'use strict';

var path = process.cwd();
var StockHandler = require(path + '/app/controllers/stockHandler.server.js');

module.exports = function(app) {

  var stockHandler = new StockHandler();

  app.route('/')
    .get(function(req, res) {
      res.render('index');
    });

  app.route('/add-stock')
    .get(stockHandler.addStock);

  app.route('/stock-search')
    .get(stockHandler.stockSearch);

  app.route('*')
    .get(function (req, res) {
      res.redirect('/');
    });

};
