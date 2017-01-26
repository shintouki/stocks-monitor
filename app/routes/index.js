'use strict';

var path = process.cwd();
var StockHandler = require(path + '/app/controllers/stockHandler.server.js');

module.exports = function(app, io) {

  var stockHandler = new StockHandler();

  // Websocket
  io.on('connection', function(socket) {
    socket.on('add stock', function(data) {
      io.emit('add stock', data);
    });

    socket.on('delete stock', function(msg) {
      io.emit('delete stock', msg);
    });
  });

  app.route('/')
    .get(function(req, res) {
      res.render('index');
    });

  app.route('/api/stocks')
    .get(stockHandler.getStocks)
    .post(stockHandler.addStock)
    .delete(stockHandler.deleteStock);

  app.route('*')
    .get(function (req, res) {
      res.redirect('/');
    });

};
