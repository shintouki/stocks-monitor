'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
  symbol: String,
  details: String,
  
});

module.exports = mongoose.model('Stock', Stock);