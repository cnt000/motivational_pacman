motivational_pacman
===================

count tasks, motivate your team, enjoy!

===================

Model

Team(s) -> Week(s) -> Score(s)

Technology:

server: node.js (express library) deployed to heroku

client: ???

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

Or contact me for the main heroku deploy instance