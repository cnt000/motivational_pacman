window.ResultsPageView = Backbone.View.extend({

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
            $('.content', this.el).append(new ResultsView({model: teams[i]}).render().el);
        }

        // $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }

});

window.ResultsView = Backbone.View.extend({

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
        "click .clickable:first"   : "add"
    },

    add: function (event) {
         var $target = $(event.currentTarget),
             $parent = $target.parent(),
             $points = $parent.find(".points");


        $points.text(+$points.text()+1);

        console.log($parent.data("mongoid"));
        console.log($parent.data("weekfrom"));

        var score = new Score({"id":$parent.data("mongoid"), "week_from": $parent.data("weekfrom")});
        score.toJSON();

        score.save({"user":"test", "date": "01/01/2001"}, {
            wait:true,
            success:function(model, response) {
                $target.removeClass("glyphicon-star-empty").addClass("glyphicon-star");
                $parent.find(" .clickable").removeClass("clickable").next().addClass("clickable");
                console.log('Successfully saved!');
            },
            error: function(model, error) {
                console.log(model.toJSON());
                console.log(error.responseText);
            }
        });



        //this.addPoint(event);
    }

});