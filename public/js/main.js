var AppRouter = Backbone.Router.extend({

    routes: {
        ""              : "home",
        "teams/add"     : "teamAdd",
        "teams/:id"     : "teamDetails",
        "teams"         : "teamList",

        "weeks/add"      : "weekAdd",

        "results"       : "results",
        "results/:teamName"       : "resultsFiltered",
        "about"         : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function () {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
    },

    results: function (page) {
        var p = page ? parseInt(page, 10) : 1;
        var teamsList = new TeamsCollection();
        teamsList.fetch({success: function(){
            $("#content").html(new ResultsPageView({model: teamsList, page: p}).el);
        }});
        this.headerView.selectMenuItem('results-menu');
    },

    resultsFiltered: function (teamName) {
        var teamsList = new TeamsCollection({
            "teamName": teamName
        });
        teamsList.fetch({success: function(){
            $("#content").html(new ResultsPageView({model: teamsList}).el);
        }});
        this.headerView.selectMenuItem('results-menu');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },

    teamAdd: function () {
        var team = new Team();
        $('#content').html(new TeamView({model: team}).el);
        this.headerView.selectMenuItem('teamsAdd');
    },

    teamDetails: function (id) {
        var team = new Team({_id: id});
        team.fetch({success: function(){
            $("#content").html(new TeamView({model: team}).el);
        }});
        this.headerView.selectMenuItem('teams-menu');
    },

    teamList: function () {
        var teamList = new TeamListView();
    },

    weekAdd: function () {
        var week = new Week();
        $('#content').html(new WeekView({model: week}).el);
        this.headerView.selectMenuItem('weeksAdd');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 
                    'AboutView', 'TeamView',
                    'ResultsView']
                    , function() {
                                    app = new AppRouter();
                                    Backbone.history.start();
                                });