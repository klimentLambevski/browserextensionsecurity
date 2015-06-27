chrome.history.onVisited.addListener(function(historyItem) {
    $.post('http://localhost:3000/storehistory', historyItem, function(res){
        console.log(res);
    }).error(function() {
        console.log('error submiting info')
    });
});