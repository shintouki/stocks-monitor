'use strict';

$(function () {
  var socket = io();

  var stockInput = $('#stock-input');
  var addStockButton = $('#add-stock-button');
  var stockList = $('#stocks-list');

  var seriesOptions = [];
  var chart;

  /**
   * Create the chart when all data is loaded
   * @returns {undefined}
   */
  function createChart() {

    chart = Highcharts.stockChart('chart-container', {

      rangeSelector: {
        selected: 4
      },
      
      credits: {
        enabled: false
      },
      
      series: seriesOptions
    });
  }

  /**
   * Create stock card at bottom with stock name & code
   * @param {string} code - Stock code.
   * @param {string} name - Stock name.
   * @returns {undefined}
   */
  function createStockCard(code, name) {

    var $div = $("<div>", {
      class: "list-group-item"
    });

    var $code = $("<h3>", {
      text: code
    });

    var $name = $("<p>", {
      text: name,
      class: 'stock-name'
    });

    var $deleteButton = $("<button>", {
      text: 'x',
      class: 'delete-stock-btn',
      id: code + '-id',
      title: 'Delete this stock'
    });

    $div.append($code);

    $div.append($name);
    $div.append($deleteButton);
    stockList.append($div);
  }

  // Load stocks and graph them on page load
  $.get('/api/stocks', function(data) {

    for (var i = 0; i < data.length; i++) {
      var code = data[i].code;
      var name = data[i].name;
      var stockData = data[i].data;

      seriesOptions[i] = {
        name: code,
        data: stockData
      }

      createStockCard(code, name);
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
    var currentButton = $(this);
    var stockCode = stockInput.val();
    stockInput.val('');
    $.post('/api/stocks', { stockCode: stockCode }, function(data) {
      if (data === 'Exists') {
        alert('Stock is already in graph');
      }
      else if (data === 'Error') {
        alert('Stock code is incorrect or does not exist')
      }
      else {
        var name = data.name;
        var code = data.code;
        var stockData = data.data;

        createStockCard(code, name);

        // Add stock to chart
        chart.addSeries({
          name: code,
          data: stockData
        });

      }

    });


  });

  // Click handler for delete stock x buttons
  stockList.on("click", ".delete-stock-btn", function() {
    var currButton = $(this);
    var buttonId = currButton.attr('id');
    var currCode = buttonId.substring(0, buttonId.length - 3);
    
    // Delete request to delete stock from DB
    $.delete('/api/stocks', { stockCode: currCode }, function(data) {
      // Delete stock card from page
      currButton.parent().remove();

      // Remove stock from chart
      if (chart.series.length) {
        for (var i = 0; i<chart.series.length; i++) {
          if (chart.series[i].name === currCode) {
            chart.series[i].remove();
          }
        }
        
      }
    });

  });

});




