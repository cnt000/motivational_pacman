var AppRouter = Backbone.Router.extend({

    routes: {
        ""              : "home",
        "teams/add"     : "teamAdd",
        "teams/:id"     : "teamDetails",
        "teams"         : "teamList",

        "weeks/add"      : "weekAdd",

        "results(/p:page)"       : "results",
        "results/name/:teamName(/week/*week_from)(/p:page)"       : "resultsFiltered",
        "about"         : "about",
        "*other"    : "home"

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
            utils.addDatePicker(".week_from");
        }});
        this.headerView.selectMenuItem('results-menu');
    },

    resultsFiltered: function (teamName, week_from, page) {
        var p = page ? parseInt(page, 10) : 1;
        var options = {};
        
        options.teamName = teamName;
        options.week_from = week_from;

        var teamsList = new TeamsCollection(options);

        teamsList.fetch({success: function(){
            $("#content").html(new ResultsPageView({model: teamsList, page: p, week_from: week_from }).el);
            utils.addDatePicker(".week_from");
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
        utils.addDatePicker("#insDate");
    },

    teamDetails: function (id) {
        var team = new Team({_id: id});
        team.fetch({success: function(){
            $("#content").html(new TeamView({model: team}).el);
        }});
        //this.headerView.selectMenuItem('teams-menu');
        utils.addDatePicker("#insDate");
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
                    'ResultsView', 'WeekWidgetView']
                    , function() {
                                    app = new AppRouter();
                                    Backbone.history.start();
                                });