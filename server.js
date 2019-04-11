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

// theData has to be outside of the scope of the App.post method
const data = new Object();
data.emojiObject = emojiObject;

App.post('/sendUserData', function(req, res) {
  // Create an object using JSON
  data.rawText = req.body.rawText;

  // package array into an object to pass into template
  res.render('template.ejs', data);
});
// access the local port + serve the site at that url
App.listen(Port, function() {
  console.log('Example app listening on port 8000!');
});
