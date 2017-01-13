/**
 * makeRequest()
 * Makes an asynchronous request.
 * @param method: The method.
 * @param url: The url.
 * @return : A promise.
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

        // Create a fragment which acts like a psuedo-DOM node to hold the child elements of the list
        var fragment = document.createDocumentFragment();

        for (var index = 0; index < 20; index++) {
            var ele = document.createElement("li");
            ele.className = "listview__list-item clearfix";
            ele.innerHTML = 
                    "<img class=\"listview__list-item-image\" src=\"" + data[index].thumbnailUrl + "\">"
                +   "<span class=\"listview__list-item-title\">" + index + " - " + data[index].title + "</span>"
                +   "</li>";

            fragment.appendChild(ele);
        }

        // Append the fragment to the DOM
        document.querySelector(".listview__list").appendChild(fragment);

    }, function(response) {
        console.log("failure");
    });
