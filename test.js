var page = require('webpage').create()
var fs = require('fs')
var dataFileSource = './price-data.json'
var dollarRegEx = new RegExp('\\$[\\d]*\\d+(.\\d{1,2})?', 'm')

page.open('http://phantomjs.org', function (status) {
  var body = page.evaluate(function() {
    return document.querySelector('body').innerText
  })
  console.log(body)
  // var content = page.content;
  // console.log('Content: ' + body);
  // var price = dollarRegEx.exec(body)
  // var data = {price: price, date: Date()}
  // fs.appendFile(dataFileSource, data, function(err) {
  //   if (err) throw err;
  //   console.log('The "data to append" was appended to file!');
  // });
  phantom.exit();
});