const Express = require('express');
const App = Express();
const Port = App.listen(8000);

// for parsing form data
// will need to install this: https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: true,
});

App.use(urlencodedParser);
// templating
App.set('view engine', 'ejs');
// static files in viewer
App.use(Express.static('viewer'));

// create a globl empty array
const allTheData = [];
// theData has to be outside of the scope of the App.post method
let theData;

App.post('/sendUserData', function(req, res) {
  // Because it's a POST we use req.body to get the data
  console.log(req.body.rawText);
  // res.send("They submitted: " + req.body.first + " " + req.body.last);
  // now we're gonna create a JSON (!!)

  // Create an object using JSON
  const data = {
    rawText: req.body.rawText,
  };
  allTheData.push(data);

  theData = new Object();
  // put data into a the global array.
  theData.allTheData = allTheData;
  console.log(theData);

  // package array into an object to pass into template
  res.render('template.ejs', theData);
  //splice previsous user data from the array
  allTheData.splice(0, allTheData.length);
});
// access the local port + serve the site at that url
App.listen(Port, function() {
  console.log('Example app listening on port 8000!');
});

// App.get('/ejsTemplateTest', function(req, res) {
//   var theData = { user: { First: 'Rebecca', Last: 'Leopold' } };
//   res.render('template.ejs', theData);
// });
