window.Score = Backbone.Model.extend({


    initialize: function(options) {
        this.id = options.id;
        this.week_from = options.week_from;
    },
    url: function() {
        return "/score/"+this.id+"/"+this.week_from;
    }
    
});

window.ScoresCollection = Backbone.Collection.extend({

});