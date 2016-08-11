var page = require('webpage').create()
var args = require('system').args
var url = args[1]

page.open(url, function (status) {
  var body = page.evaluate(function() {
    return document.querySelector('body').innerText
  })
  console.log(body)
  phantom.exit();
});
