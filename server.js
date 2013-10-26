var express = require('express'),
    http = require('http'),
    path = require('path'),
    model = require('./api/v1/teams');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});

var server = http.createServer(app);


server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

app.get('/teams', model.findAll);
app.get('/teams/name/:name', model.findByName);
app.get('/team/:id', model.findById);

app.post('/team', model.addTeam);
app.put('/team/:id', model.updateTeam);
app.delete('/team/:id', model.deleteTeam);

app.put('/score/:id/:week_from', model.pushScore);
app.put('/week/:id/:week_from', model.pushWeek);

//app.get('/results', model.getResults);

app.get('/testData', model.testData);