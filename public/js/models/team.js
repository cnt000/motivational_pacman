window.Team = Backbone.Model.extend({

	urlRoot: "/teams",

	idAttribute: "_id",

	initialize: function () {
		this.validators = {};

		this.validators.name = function (value) {
			return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
		};

		// this.validators.subtitle = function (value) {
		// 	return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a subtitle"};
		// };

		// this.validators.description = function (value) {
		// 	return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a description"};
		// };

		// this.validators.picture = function (value) {
		// 	return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a picture"};
		// };
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

	defaults: {
		_id: null,
		"name": "",
    	"fromDate": "",
    	"scores": []
	}
});

window.TeamsCollection = Backbone.Collection.extend({

	model: Team,

	url: "/teams"

});