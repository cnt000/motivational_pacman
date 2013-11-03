window.ResultsPageView = Backbone.View.extend({

    initialize: function (options) {
        this.options = options;
        this.render();
    },

    render: function () {
        var teams = this.model.models;
        var len = teams.length;
        var page = this.options.page || 1;
        var startPos = (page - 1) * utils.limitPerPage;
        var endPos = Math.min(startPos + utils.limitPerPage, len);


        if(teams.length === 0) {
           $(this.el).html('\
                                        <div class="jumbotron">\
                                            <div>Nessun team inserito</div>\
                                            <a href="#teams/add">Aggiungi team</a></div>\
                                        </div>');
        } else {
            $(this.el).html('<h1>Results - <a href="#results">All</a></h1><div class="content"></div>');
            $(this.el).prepend(new WeekWidgetView({model: this.model, ids: this.model.pluck("_id"), names: this.model.pluck("name")}).render().el);
        }

        for (var i = startPos; i < endPos; i++) {
            $('.content', this.el).append(new ResultsView({model: teams[i]}).render().el);
        }
        if(len>3) {
            $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);
        }

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
        "click .clickable"   : "add",
        "click .add"   : "addWeek"
    },

    add: function (event) {
         var $target = $(event.currentTarget),
             $parent = $target.parent(),
             $points = $parent.find(".points");


        $points.text(+$points.text()+1);

        var today = new Date();
            today = utils.dateFormat(today, "DD/MM/YYYY");

            var scores = this.model.get('scores');

            for(var i=0;i<scores.length;i++) {
                if(scores[i].week_from === $parent.data("weekfrom").replace(/_/g, "/")) {
                    scores[i].points = scores[i].points+1;
                    scores[i].inserted.push({
                        user: "edo",
                        date: today
                    });
                }
            }

            this.model.set({"scores": scores});
            this.model.save(null, {
                success: function (model) {
                    if($target.hasClass("last")) {
                        $target.after($target.clone());
                    }
                    $target.removeClass("glyphicon-star-empty").addClass("glyphicon-star");
                    $parent.find(" .clickable").removeClass("clickable").next().addClass("clickable");
                    console.log('Successfully saved!');

                },
                error: function () {
                }
            });

    },

    addWeek: function (event) {
        var $form = $(event.currentTarget).closest("form"),
             $teamId = $form.find(".teamId"),
             $week_from = $form.find(".week_from"),
             teamId = $teamId.val(),
             week_from = $week_from.val().replace(/\//g, "_");

            this.model.set({"scores": this.model.get('scores').concat({"week_from": $week_from.val(), points: 0, inserted: []})});
            this.model.save(null, {
                success: function (model) {

                },
                error: function () {
                }
            });

        return false;

    }

});