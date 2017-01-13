/**
 * makeRequest()
 * Makes an asynchronous request.
 */
function makeRequest(method, url) {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();

        request.onload = function() {
            resolve(request);
        };

        request.onerror = function() {
            reject(request);
        };

        request.open(method, url);
        request.send();
    });
}

makeRequest("GET", "http://jsonplaceholder.typicode.com/photos")
    .then(function(response) {
        var data = JSON.parse(response.response);

        var ulTag = "<ul class=\"listview__list\">";
        var liTags = "";

        for (var index = 0; index < 20; index++) {
            liTags = liTags
                    +   "<li class=\"listview__list-item clearfix\">" 
                    +   "<img class=\"listview__list-item-image\" src=\"" + data[index].thumbnailUrl + "\">"
                    +   "<span class=\"listview__list-item-title\">" + index + " - " + data[index].title + "</span>"
                    +   "</li>";
        }

        ulTag = ulTag + liTags + "</ul>";

        document.getElementById("listview").innerHTML = ulTag;   
    }, function(response) {
        console.log("failure");
    });
