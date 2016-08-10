var page = require('webpage').create()
var args = require('system').args;
// console.log("args:", args[1])

page.open('https://www.appliancesonline.com.au/sunbeam-electric-ceramic-heater-he2125/', function (status) {
  var body = page.evaluate(function() {
    return document.querySelector('body').innerText
  })
  console.log(body)
  phantom.exit();
});
