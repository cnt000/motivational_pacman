window.ResultsPageView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    events: {
        "click .add"   : "addWeek"
    },

    addWeek: function (event) {
         var $form = $(event.currentTarget).closest("form"),
             $teamId = $form.find(".teamId"),
             $week_from = $form.find(".week_from"),
             teamId = $teamId.val(),
             week_from = $week_from.val().replace(/\//g, "_");


        console.log($teamId.val());
        console.log($week_from.val());

        var week = new Week({"id": teamId, "week_from": week_from});
        week.toJSON();

        week.save({}, {
            wait:true,
            success:function(model, response) {
                console.log('Successfully saved!');
                app.navigate("/results", true);
            },
            error: function(model, error) {
                console.log(error.responseText);
            }
        });

        return true;

    },

    render: function () {
        var teams = this.model.models;
        var len = teams.length;
        // var startPos = (this.options.page - 1) * 8;
        // var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<h1>Results - <a href="#results">All</a></h1><div class="content"></div>');


        if(teams.length === 0) {
            $('.content', this.el).append('<div class="jumbotron">\
                                    <div>Nessun team inserito</div>\
                                </div>');
             
        }

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
        "click .clickable"   : "add"
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
                if($target.hasClass("last")) {
                    $target.after($target.clone());
                }
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