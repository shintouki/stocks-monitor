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
    var stockCode = stockInput.val();
    $.post('/api/stocks', { stockCode: stockCode }, function(data) {
      if (data === 'Exists') {
        alert('Stock is already in graph');
      }
      else if (data === 'Error') {
        alert('Stock code is incorrect or does not exist')
      }
      else {
        // Add stock card at bottom
        var name = data.name;
        var code = data.code;

        createStockCard(code, name);
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

    });

  });

});




