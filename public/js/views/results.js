window.ResultsView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var teams = this.model.models;
        var len = teams.length;
        // var startPos = (this.options.page - 1) * 8;
        // var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<h1>Results</h1><div class="content"></ul>');

        for (var i = 0; i < len; i++) {
            $('.content', this.el).append(new WeekView({model: teams[i]}).render().el);
        }

        // $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }

});

window.WeekView = Backbone.View.extend({

    tagName: "div",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
    	// var team = this.model.attributes;
    	// var len = team.scores.length;

        //console.log(this.getMonday(new Date()));

        $(this.el).html(this.template(this.model.toJSON()));

        // for (var i = 0; i < len; i++) {
        //    $('.score_list', this.el).append(new ScoreView({model: team.scores[i]}).render().el);
        // }

        return this;
    },

    getMonday: function(d) {
      d = new Date(d);
      var day = d.getDay(),
          diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
      var monday = new Date(d.setDate(diff));
     
     return this.dateFormat(monday, "DD/MM/YYYY");
    },

    /**
    * Format date as a string
    * @param date - a date object (usually "new Date();")
    * @param format - a string format, eg. "DD-MM-YYYY"
    */
    dateFormat: function(date, format) {
        // Calculate date parts and replace instances in format string accordingly
        format = format.replace("DD", (date.getDate() < 10 ? '0' : '') + date.getDate()); // Pad with '0' if needed
        format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)); // Months are zero-based
        format = format.replace("YYYY", date.getFullYear());
        return format;
    }

});

window.ScoreView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
    },

    render: function () {

        $(this.el).html(this.template(this.model.toJSON()));

        return this;
    }

});