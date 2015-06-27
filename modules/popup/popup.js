// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.cookies.getAll({domain: '.facebook.com'}, function(data){
    console.log(data);
  });
  $('#searchInput').keyup(function(e) {
    var val = $(this).val();
    console.log(val);
    chrome.bookmarks.getTree(function(tree) {
      var res = searchBookmarksTree(tree, val);
      console.log(res);
      var resContainer = $('.results');
      resContainer.html('');
      _.each(res, function(resItem){
        resContainer.append('<div><a href="' + resItem.url + '" target="_blank">' + resItem.title + '</a></div>');
      })
    });
  });

});

function searchBookmarksTree(bookmarksTree, searchStr) {
  var resultsArr = [];
  _.each(bookmarksTree, function(tree) {
    searchCurrent(tree, resultsArr);
  });

  function searchCurrent(tree, results) {
    if(!_.isEmpty(tree.title) && tree.title == searchStr) {
      if(tree.url) {
        results.push(tree);
      } else {
        getChildren(tree, results);
      }
    }
    _.each(tree.children, function(child) {
      searchCurrent(child, results)
    });

    function getChildren(tree, res) {
      _.each(tree.children, function(child) {
        if(child.url) results.push(child);
        else {
          getChildren(child, res);
        }
      })
    }
  }
  return resultsArr;
}
