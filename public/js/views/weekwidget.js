window.WeekWidgetView = Backbone.View.extend({

    className: "weekWidget",

    initialize:function (options) {
        this.options = options;
        this.model.bind("reset", this.render, this);
        this.render();
    },

    events: {
        "click .add"   : "addWeek"
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON(), this.options.ids, this.options.names));
        return this;

    },

    addWeek: function (event) {
        var $form = $(event.currentTarget).closest("form"),
            $teamId = $("#teamId"),
            $week_from = $form.find(".week_from"),
            teamId = $teamId.val(),
            week_from = $week_from.val().replace(/\//g, "_"),
            modelSelected = this.model.filter(function(c){ return teamId === c.id})[0];

        modelSelected.set({"scores": modelSelected.get('scores').concat({"week_from": $week_from.val(), points: 0, inserted: []})});
        modelSelected.save(null, {
            success: function (model) {

            },
            error: function () {
            }
        });

        return false;

    }
});