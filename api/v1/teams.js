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
        collection.find().sort({ "name":1 }).toArray(function(err, items) {
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

//=======CRUD team==========================

exports.addTeam = function(req, res) {
    var team = req.body;
    console.log('Adding team: ' + JSON.stringify(team));
    db.collection('teams', function(err, collection) {
        collection.insert(team, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateTeam = function(req, res) {
    var id = req.params.id;
    var team = req.body;
    delete team._id;
    console.log('Updating team: ' + id);
    db.collection('teams', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, team, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating team: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(team);
            }
        });
    });
};
 
exports.deleteTeam = function(req, res) {
    var id = req.params.id;
    console.log('Deleting team: ' + id);
    db.collection('teams', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

//=======Insert data test==========================

exports.testData = function(req, res) {

    db.collection('teams', function(err, collection) {
        collection.insert(testDataFile, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'Already inserted'});
            } else {
                res.send({'ok':'call /teams'});
            }
        });
    });

};