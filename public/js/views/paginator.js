window.Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize:function (options) {
        this.options = options;
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {

        var items = this.model.models;
        var len = items.length;
        var pageCount = Math.ceil(len / utils.limitPerPage);

        $(this.el).html('<ul class="pagination" />');

        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#results/p"+(i+1)+"'>" + (i+1) + "</a></li>");
        }

        return this;
    }
});