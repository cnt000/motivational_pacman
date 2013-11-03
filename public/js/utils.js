window.utils = {

    limitPerPage: 3,

    // Asynchronously load templates located in separate .html files
    loadTemplate: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },

    displayValidationErrors: function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
        this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
    },

    addValidationError: function (field, message) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.addClass('error');
        $('.help-inline', controlGroup).html(message);
    },

    removeValidationError: function (field) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.removeClass('error');
        $('.help-inline', controlGroup).html('');
    },

    showAlert: function(title, text, klass) {
        $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<strong>' + title + '</strong> ' + text);
        $('.alert').show();
    },

    showWeekAlert: function(title, text, klass, id) {
        $('.'+id).removeClass("alert-error alert-warning alert-success alert-info");
        $('.'+id).addClass(klass);
        $('.'+id).html('<strong>' + title + '</strong> ' + text);
        $('.'+id).show();
    },

    hideAlert: function() {
        $('.alert').hide();
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
    },

    addDatePicker: function (element) {
        $(element).datepicker({ 
                            format: "dd/mm/yyyy",
                            weekStart: 1
                        });
    }

};