var express = require('express'),
    http = require('http'),
    model = require('./api/v1/teams');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser())
});

var server = http.createServer(app);


server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

app.get('/teams', model.findAll);
app.get('/team/:id', model.findById);
app.get('/team/name/:name', model.findByName);

app.get('/testData', model.testData);