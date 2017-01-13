(function() {
    "use strict";

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

    /**
     * createFragment()
     * Create a fragment which acts like a psuedo-DOM node to hold the child items of the list.
     * @param numItems: Number of items to add to the fragment.
     * @param startIndex: Which index to start at for the data.
     * @param data: The data received from the fetch request.
     * @return fragment: The fragment DOM node.
     */
    function createFragment(numItems, startIndex, data) {
        var fragment = document.createDocumentFragment();

        for (var index = startIndex; index < numItems; index++) {
            var ele = document.createElement("li");
            ele.className = "listview__list-item clearfix";
            ele.innerHTML = 
                    "<img class=\"listview__list-item-image\" src=\"" + data[index].thumbnailUrl + "\">"
                +   "<span class=\"listview__list-item-title\">" + index + " - " + data[index].title + "</span>"
                +   "</li>";

            fragment.appendChild(ele);
        }

        return fragment;
    }

    /**
     * bindClickEvent()
     * Bind the click event to the "Show more" button.
     * @param data: The data received from the fetch request. 
     */
    function bindClickEvent(data) {
        var startIndex = 0;
        var numItemsToDisp = 18;

        document.querySelector(".listview__btn").addEventListener("click", function(evt) {
            console.log(data);
            var fragment = createFragment(numItemsToDisp + startIndex, startIndex, data);

            // Update the start index
            startIndex = startIndex + numItemsToDisp;

            console.log(startIndex);

            // Append the fragment to the DOM
            document.querySelector(".listview__list").appendChild(fragment);
        });
    }

    /**
     * init()
     * The initial function to execute.
     */
    function init() {
        makeRequest("GET", "http://jsonplaceholder.typicode.com/photos")
            .then(function(response) {
                var data = JSON.parse(response.response);

                bindClickEvent(data);
            }, function(response) {
                console.log("failure");
            });
    }

    init();
})();
