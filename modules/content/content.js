'use strict';
$(document).ready(function() {
    var allPageForms = $('form');
    var passPageForms = [];
    _.each(allPageForms, function(form) {
        var passInput = $(form).find('input[type=password]');
        if(passInput.length > 0) {
            $(form).on('submit', function(e){
                e.stopPropagation();
                e.preventDefault();
                console.log(_.object($(form).serializeArray().map(function(v) {return [v.name, v.value];} )))
            });
            passPageForms.push(form);
        }
    });
});