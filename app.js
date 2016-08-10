var fs = require('fs')
var dataFileSource = './price-data.json'
let logDir = process.env.OPENSHIFT_LOG_DIR || __dirname + '/logs'
var data = require(logDir + '/price-data.json');
var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs-prebuilt')
var binPath = phantomjs.path
var dataFileSource = './price-data.json'
var dollarRegEx = new RegExp('\\$[\\d]*\\d+(.\\d{1,2})?', 'm')


console.log(data.urls[0]["https://www.appliancesonline.com.au/sunbeam-electric-ceramic-heater-he2125/"])
console.log(Object.keys(data.urls[0]))
data.urls[0]["https://www.appliancesonline.com.au/sunbeam-electric-ceramic-heater-he2125/"].push({"price": 3, "date": Date()})


var childArgs = [
  path.join(__dirname, 'phantomjs-script.js'),
  'some other argument (passed to phantomjs script) add the url here!'
]

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  console.log('stdout:', stdout)
  var bodyText = stdout
  if(bodyText !== "\n") { //check if there is a body before proceding
    createJsonPriceData(bodyText)
  }
})

function createJsonPriceData(bodyText) {
  var price = extractPriceFromBody(bodyText)
  var priceDate = { price: price, data: Date() }
  var url = "https://www.appliancesonline.com.au/sunbeam-electric-ceramic-heater-he2125/"
  data.urls[0][url].push(priceDate)
  writeData()
}

function extractPriceFromBody(bodyText) {
  return dollarRegEx.exec(bodyText)[0]
}

function writeData() {
  fs.writeFile(dataFileSource, JSON.stringify(data, null, 2), function (err) {
    if (err) return console.log(err);
    console.log(`Data written to ${dataFileSource} successfully!`)
  });
}


// var Diff = require('text-diff')
// var striptags = require('striptags')
// var fs = require('fs')


// var diff = new Diff()


// var seventyNine = striptags(fs.readFileSync(__dirname + '/data/79 save 10 Sunbeam HE2125 Electric Ceramic Heater _ Appliances Online.html', 'utf8').replace(/(\r\n|\n|\r)/gm, ""))
// var eightyNine = striptags(fs.readFileSync(__dirname + '/data/Sunbeam HE2125 Electric Ceramic Heater _ Appliances Online.html', 'utf8').replace(/(\r\n|\n|\r)/gm, ""))
// var ninetyNine = striptags(fs.readFileSync(__dirname + '/data/99 test Sunbeam HE2125 Electric Ceramic Heater | Appliances Online.html', 'utf8').replace(/(\r\n|\n|\r)/gm, ""))


// var dollarRegEx = new RegExp('\\$[\\d]*\\d+(.\\d{1,2})?', 'm')
// var matches = dollarRegEx.exec(seventyNine);

// var seventyN = dollarRegEx.exec(seventyNine)[0]
// var eightyN = dollarRegEx.exec(eightyNine)[0]

// console.log(seventyN)
// console.log(eightyN)

// var textDiff = diff.main(seventyN, eightyN)
// console.log(textDiff)


// function hasDecreased(previous, current) {
//   return previous < current
// }


// [
//   [ 0, '$' ],
//   [ -1, '7' ],
//   [ 1, '8' ],
//   [ 0, '9' ]
// ]
// [ [ 0, '$' ], [ -1, '7' ], [ 1, '8' ], [ 0, '9' ] ]
// [ [ 0, '$' ], [ -1, '7' ], [ 1, '9' ], [ 0, '9' ] ]

// var test2 = striptags(fs.readFileSync(__dirname + '/data/test2.html', 'utf8').replace(/(\r\n|\n|\r)/gm, ""))
// var test = striptags(fs.readFileSync(__dirname + '/data/test.html', 'utf8').replace(/(\r\n|\n|\r)/gm, ""))

// var html1 = dollarRegEx.exec(test)[0]
// var html2 = dollarRegEx.exec(test2)[0]

// var textDiff = diff.main(html1, html2)
// console.log(textDiff)
// returns -> [ [ 0, '$' ], [ -1, '7' ], [ 1, '8' ], [ 0, '9' ] ]




// [ [ 0, '$' ],
//   [ -1, '7' ],
//   [ 1, '8' ],
//   [ 0, '9' ]
// ]
// var x = '<body ng-app="aol" aol-body="" ng-controller="AppController" ng-class="{ &#39;mobile-nav-menu-open&#39;: mobileNavMenuOpened, &#39;mobile-nav-menu-close&#39;: mobileNavMenuClosed, &#39;mobile-faq-menu-toggled&#39;: mobileFaqMenuToggled, &#39;mobile-my-cart-toggled&#39;: mobileMyCartToggled }" aol-window-resize="" breakpoint="{0:&#39;xs&#39;, 520:&#39;sm&#39;, 768:&#39;md&#39;, 975:&#39;lg&#39;, 1200:&#39;xl&#39;}" class="ng-scope"><!-- Start Top Navigation Bar --><div id="top-navigation-bar-container" class="main-wrapper hidden-xs hidden-sm"><nav id="top-navigation-bar" class="main-inner"><ul class="top-navigation-bar-nav row"><li class="top-navigation-bar-nav-item top-navigation-bar-nav-delivery"><a href="https://www.appliancesonline.com.au/appliances-online-delivery-service.aspx" target="_self"><i class="icon-top-nav-freedelivery"></i>Free, next day delivery*</a></li><li class="top-navigation-bar-nav-item top-navigation-bar-nav-recycling"><a href="https://www.appliancesonline.com.au/why-buy-from-us.aspx#freeConnection" target="_self"><i class="icon-top-nav-recycling"></i>Free connection, removal &amp; recycling*</a></li><li class="top-navigation-bar-nav-item top-navigation-bar-nav-cs"><a href="https://www.appliancesonline.com.au/why-buy-from-us.aspx#customerSupport" target="_self"><i class="icon-top-nav-customersupport"></i>Australian customer support</a></li><li class="top-navigation-bar-nav-item top-navigation-bar-nav-guarantee"><a href="https://www.appliancesonline.com.au/our-prices.aspx" target="_self"><i class="icon-checkout-price"></i>Best value guarantee</a></li></body>'

// diff.prettyHtml(textDiff)
// console.log(textDiff[0][1] === '$')
// console.log(textDiff.map(function(diff) { return diff[0]}))
// console.log(textDiff)


// IDEA do a regex to find $, maybe return the whole line so i can compare similar lines to each other





// var semanticClean = diff.cleanupSemantic(textDiff)
// console.log(semanticClean)


// var textDiff = diff.main(seventyNine, eighty)

// diff.prettyHtml(textDiff)
// console.log(textDiff)

// console.log(seventyNine.replace(/<(?:.|\n)*?>/gm, ''''))