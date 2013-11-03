window.TeamView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "blur #insDate"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteTeam"
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveTeam();
        return false;
    },

    saveTeam: function () {
        var self = this;
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('teams/' + model.id, false);
                utils.showAlert('Success!', 'Teams saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });

    },

    deleteTeam: function () {
        this.model.destroy({
            success: function () {
                alert('Team deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

});

window.TeamListView = Backbone.View.extend({

    el: '#content',

    initialize: function () {
        $(this.el).html("<h1>Teams</h1>");
        this.collection = new TeamsCollection();
        this.collection.on('sync', this.render, this);
        this.collection.fetch();
    },

    render: function () {

        var items = [];
        _.each(this.collection.models, function(model) {
            team = model.toJSON();
            items.push('<li><a href="#teams/' + team._id + '">' + team.name + '</a></li>');
        });

        $('<ul/>', {
            html: items.join('')
        }).appendTo(this.el);
        this.trigger('render');
    }

});