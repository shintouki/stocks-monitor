'use strict';

$(function () {

  var stockInput = $('#stock-input');
  var addStockButton = $('#add-stock-button');


  var seriesOptions = [];
  var seriesCounter = 0;
  var names = ['GOOG', 'YHOO', 'FB', 'AAPL'];

  /**
   * Create the chart when all data is loaded
   * @returns {undefined}
   */
  function createChart() {

    Highcharts.stockChart('chart-container', {

      rangeSelector: {
        selected: 4
      },

      yAxis: {
        labels: {
          formatter: function () {
            return (this.value > 0 ? ' + ' : '') + this.value + '%';
          }
        },
        plotLines: [{
          value: 0,
          width: 2,
          color: 'silver'
        }]
      },

      plotOptions: {
        series: {
          compare: 'percent',
          showInNavigator: true
        }
      },

      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: true
      },

      series: seriesOptions
    });
  }

  // $.each(names, function (i, name) {

  //   $.get('/stock-search', { stockName: names[i] }, function(data) {

  //     var stockData = data.relevantDataArr;
  //     // console.log(stockData);

  //     seriesOptions[i] = {
  //       name: name,
  //       data: stockData
  //     };

  //     // As we're loading the data asynchronously, we don't know what order it will arrive. So
  //     // we keep a counter and create the chart when all the data is loaded.
  //     seriesCounter += 1;
  //     // console.log(seriesCounter);
  //     if (seriesCounter === names.length) {
  //       console.log("creating chart...");
  //       createChart();
  //     }
  //   });

  // });

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

    });


  });

});




