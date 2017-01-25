'use strict';

$(function () {

  var stockInput = $('#stock-input');
  var addStockButton = $('#add-stock-button');
  var stockList = $('#stocks-list');

  var seriesOptions = [];
  // var seriesCounter = 0;
  // var names = ['GOOG', 'YHOO', 'FB', 'AAPL'];

  /**
   * Create the chart when all data is loaded
   * @returns {undefined}
   */
  function createChart() {

    Highcharts.stockChart('chart-container', {

      rangeSelector: {
        selected: 4
      },

      series: seriesOptions
    });
  }

  // Load stocks and graph them on page load
  $.get('/api/stocks', function(data) {

    for (var i = 0; i < data.length; i++) {
      var name = data[i].name;
      var code = data[i].code;
      var stockData = data[i].data;

      seriesOptions[i] = {
        name: code,
        data: stockData
      }

      // Create list-group on bottom with stock name & code
      var $div = $("<div>", {
        class: "list-group-item"
      });

      var $h3 = $("<h3>", {
        text: code
      });

      var $p = $("<p>", {
        text: name,
        class: 'text-muted'
      });

      $div.append($h3);
      $div.append($p);
      stockList.append($div);
    }

    createChart();

  });


  // Let user press enter key inside stockInput to trigger addStockButton
  stockInput.keyup(function(event) {
    if(event.keyCode == 13){
      addStockButton.click();
    }
  });

  addStockButton.click(function() {
    var stockCode = stockInput.val();
    $.post('/api/stocks', { stockCode: stockCode }, function(data) {
      console.log(data);
      if (data === 'Exists') {
        alert('Stock is already in graph');
      }
      else if (data === 'Error') {
        alert('Stock code is incorrect or does not exist')
      }
      else {

      }

    });


  });

});




