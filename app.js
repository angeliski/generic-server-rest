var express = require('express');
var app = express();
var fs = require('fs');


app.use(express.bodyParser());

app.all('/lista/:arquivo', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.get('/lista/:arquivo', function(req, res) {
  res.type('application/json');
  var arquivo = req.params.arquivo;		
try {
    var obj = JSON.parse(fs.readFileSync(arquivo+".json", 'utf8'));
} catch (e) {
	  if (e.code === 'ENOENT') {
	     var obj = JSON.parse(fs.readFileSync("default.json", 'utf8'));
	}
}
  res.json(obj);
});


app.listen(process.env.PORT || 4730);

