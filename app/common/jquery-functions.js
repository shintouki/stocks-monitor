var appUrl = window.location.origin;
// Function that runs ajax delete and looks like other jquery functions (get, post)
$.delete = function(url, data, success, dataType) {
 
  if ( $.isFunction(data) ){
    type = type || callback;
    callback = data;
    data = {}
  }
 
  return $.ajax({
    type: 'DELETE',
    url: url,
    data: data,
    success: success,
    dataType: dataType
  });
}