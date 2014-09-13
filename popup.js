// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */

var kittenGenerator = {
  
  getWindowLocation: function () {
    // alert(window.location);
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {  
    var url = tabs[0].url;
    var parser = document.createElement('a');
    parser.href = url;
    var u = parser.hostname.split('.');
    var host;

    if(u.length === 2) {host = u[0]}
    else if(u.length === 3) {
      host = u[1];
    } 

    console.log(host);

    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.climatecounts.org/1/Companies.json?IncludeScores=True&StartsWith=True&Search=" + host;

    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        myFunc(myArr);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    });

    function myFunc(myArr) {
      setTimeout(function () {
        console.log(myArr);
        var score = myArr.Companies[0].Scores.Scores[0].Total;

        document.getElementById("score").innerText = "This site has a score of " + score;
        console.log(score);
      }, 500);
    }
  },
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  kittenGenerator.getWindowLocation();
});
