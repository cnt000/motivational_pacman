motivational_pacman
===================

count tasks, motivate your team, enjoy!

===================

Model

Team(s) -> Score(s)

Technology:

server: 
node.js (express) + mongodb [deployed to heroku]

client: bootstrap 3
http://getbootstrap.com/components/

===================

resources:

tutorial:
http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/
http://coenraets.org/blog/2012/10/nodecellar-sample-application-with-backbone-js-twitter-bootstrap-node-js-express-and-mongodb/
versione PHP:
http://coenraets.org/blog/2012/05/single-page-crud-application-with-backbone-js-and-twitter-bootstrap/

===================
To run the application on your own Heroku account:

Install the Heroku Toolbelt
Sign up for a Heroku account
Login to Heroku from the heroku CLI:

$ heroku login
Create a new app on Heroku:

$ heroku create
Add the MongoLab Heroku Add-on

$ heroku addons:add mongolab
Upload the app to Heroku:

$ git push heroku master
Open the app in your browser:

$ heroku open

--> http://motivational.herokuapp.com/teams

(contact me for the main heroku deploy instance)

==============================================================================
calls
==============================================================================

app.get('/teams', model.findAll);
app.get('/team/:id', model.findById);
app.get('/team/name/:name', model.findByName);

app.post('/team', model.addTeam);
app.put('/team/:id', model.updateTeam);
app.delete('/team/:id', model.deleteTeam);

app.put('/score/:id', model.pushScore);

app.get('/testData', model.testData);

==============================================================================
test  calls
==============================================================================
For example, using cURL, you can test the Wine Cellar API with the following commands:

Get all teams:
curl -i -X GET http://localhost:3000/teams

Get team with _id value of 5262bf23860ea69b23000002 (use a value that exists in your database):
curl -i -X GET http://localhost:3000/team/5262bf23860ea69b23000002

Delete team with _id value of 5262bf23860ea69b23000002:
curl -i -X DELETE http://localhost:3000/team/5262bf23860ea69b23000002

Add a new team:
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New Wine", "year": "2009"}' http://localhost:3000/team

============================================================

Modify team with _id value of 5262bf23860ea69b23000002:
curl -i -X PUT -H 'Content-Type: application/json' -d '{
    "name": "S3",
    "fromDate": "02/01/2013",
    "scores": [
        {
            "week_from": "02/07/2013",
            "week_to": "09/07/2013",
            "date": "03/07/2013",
            "user": "nardaa"
        },
        {
            "week_from": "02/07/2013",
            "week_to": "09/07/2013",
            "date": "04/07/2013",
            "user": "nardaa"
        },
        {
            "week_from": "02/07/2013",
            "week_to": "09/07/2013",
            "date": "05/07/2013",
            "user": "canduccis"
        },
        {
            "week_from": "02/07/2013",
            "week_to": "09/07/2013",
            "date": "06/07/2013",
            "user": "magnim"
        }
    ]
}' http://localhost:3000/team/5262bf23860ea69b23000002

=========================================================

Push score for team 5262ddb5832370d62c000002:
curl -i -X PUT -H 'Content-Type: application/json' -d '{
            "week_from": "02/09/2013",
            "week_to": "09/09/2013",
            "date": "03/09/2013",
            "user": "giannone"
}' http://localhost:3000/score/5262ddb5832370d62c000002

