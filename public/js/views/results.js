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

        $(this.el).html(this.template(this.model.toJSON()));

        return this;
    },

    events: {
        "click .glyphicon-star-empty"   : "add"
    },

    add: function (event) {
        this.addPoint(event);
    },

    addPoint: function(event) {
        var self = this;

    }

});