'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
  code: String,
  name: String,
  data: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Stock', Stock);