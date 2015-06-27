chrome.history.onVisited.addListener(function(historyItem) {
    $.post('http://localhost/storehistory', data, function(res){
        //$(form).submit();
        console.log(res);
    }).error(function() {
        console.log('error submiting info')
        //$(form).submit();
    });
});