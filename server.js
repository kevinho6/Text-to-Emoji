const emojiObject = require('./textEmojis.json');

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
const theData = new Object();
theData.emojiObject = emojiObject;

App.post('/sendUserData', function(req, res) {
  // Create an object using JSON
  const data = {
    rawText: req.body.rawText,
  };
  allTheData.push(data);

  // put data into a the global array.
  theData.allTheData = allTheData;

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
