window.Week = Backbone.Model.extend({

    initialize: function (options) {

        this.id = options.id;
        this.week_from = options.week_from;

        this.validators = {};

        this.validators.week_from = function (value) {
            return value.length === 10 ? {isValid: true} : {isValid: false, message: "You must enter a date DD/MM/YYYY"};
        };

    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
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

});