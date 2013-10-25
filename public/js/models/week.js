window.Week = Backbone.Model.extend({

    initialize: function (options) {

        this.id = options.id;
        this.week_from = options.week_from;

    },
    
    url: function() {
        return "/week/"+this.id+"/"+this.week_from;
    },

    defaults: {
        _id: null,
        points: 0,
        week_from: "",
        inserted: []
    }
});

window.WeeksCollection = Backbone.Collection.extend({

    model: Week,

    initialize: function(options) {
        this.id = options.id;
        this.week_from = options.week_from;
    },
    url: function() {
        return "/week/"+this.id+"/"+this.week_from;
    }

});