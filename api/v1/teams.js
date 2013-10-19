var mongo = require('mongodb'),
    testDataFile = require('../../example_data/test');

var Server = mongo.Server,
	BSON = mongo.BSONPure,
	Db = mongo.Db,
	db = {};

var mongoUri = process.env.MONGOLAB_URI || "mongodb://localhost/teamsdb?auto_reconnnect&safe=true";

mongo.connect(mongoUri, {}, function(err, database) {
	if(!err) {
		db = database;
		console.log("Connected to 'teamsdb' database");
		db.collection('teams', {safe:true}, function(err, collection) {
			if (err) {
				console.log("The 'teams' collection doesn't exist. call /testData");
			}
		});
	}
	else {
		console.log("COULD NOT CONNECT TO MONGO: " + mongoUri);
	}
});
 
exports.findById = function(req, res) {
	var id = req.params.id;
	console.log(req);
	db.collection('teams', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
			res.send(item);
		});
	});
};

exports.findAll = function(req, res) {
	db.collection('teams', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.findByName = function(req, res) {
	var name = req.params.name;
	console.log('Retrieving team: ' + name);
	db.collection('teams', function(err, collection) {
		collection.find({'name': new RegExp(name, "i")}).toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.testData = function(req, res) {

	db.collection('teams', function(err, collection) {
		collection.insert(testDataFile, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred teams'});
			} else {
				res.send({'ok':'call /teams'});
			}
		});
	});

};