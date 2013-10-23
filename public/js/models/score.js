window.Score = Backbone.Model.extend({


    initialize: function(options) {
        this.id = options.id;
        this.week_from = options.week_from;
    },
    url: function() {
        return "/score/"+this.id+"/"+this.week_from;
    },

    defaults: {
        "user": "test",
        "date": '01_01_13'
    }
});

window.ScoresCollection = Backbone.Collection.extend({

    model: Score,

    initialize: function(options) {
        this.id = options.id;
        this.week_from = options.city;
    },
    url: function() {
        return "/scores/"+this.id+"/"+this.week_from;
    }

});