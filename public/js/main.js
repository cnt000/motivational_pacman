var AppRouter = Backbone.Router.extend({

	routes: {
		""              : "home",
		"teams"	        : "list",
		"about"         : "about",
		"results"       : "results"
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
			$("#content").html(new ResultsView({model: teamsList, page: p}).el);
		}});
		this.headerView.selectMenuItem('results-menu');
	},

	about: function () {
		if (!this.aboutView) {
			this.aboutView = new AboutView();
		}
		$('#content').html(this.aboutView.el);
		this.headerView.selectMenuItem('about-menu');
	}

});

utils.loadTemplate(['HomeView', 'HeaderView', 'AboutView', 'WeekView']
					, function() {
									app = new AppRouter();
									Backbone.history.start();
								});