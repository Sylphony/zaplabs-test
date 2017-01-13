(function() {
    "use strict";

    var listView = {
        startIndex: 0,
        numItemsToDisp: 18,

        /**
         * makeRequest()
         * Makes an asynchronous request.
         * @param method: The method.
         * @param url: The url.
         * @return : A promise.
         */
        makeRequest: function(method, url) {
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
        },


        /**
         * createFragment()
         * Create a fragment which acts like a psuedo-DOM node to hold the child items of the list.
         * @param data: The data received from the fetch request.
         * @return fragment: The fragment DOM node.
         */
        createFragment: function() {
            var fragment = document.createDocumentFragment();

            for (var index = this.startIndex; index < (this.numItemsToDisp + this.startIndex); index++) {
                var ele = document.createElement("li");
                ele.className = "listview__list-item";
                ele.innerHTML = 
                        "<img class=\"listview__list-item-image\" src=\"" + this.data[index].thumbnailUrl + "\">"
                    +   "<span class=\"listview__list-item-title\">" + index + " - " + this.data[index].title + "</span>"
                    +   "</li>";

                fragment.appendChild(ele);
            }

            return fragment;
        },


        /**
         * showMoreItems()
         * Show more items on the page.
         */
        showMoreItems: function(data) {
            var fragment = this.createFragment(this.numItemsToDisp + this.startIndex, this.startIndex);

            // Update the start index count
            this.startIndex = this.startIndex + this.numItemsToDisp;

            // Append the fragment to the DOM
            document.querySelector(".listview__list").appendChild(fragment);
        }
    };

    listView.makeRequest("GET", "http://jsonplaceholder.typicode.com/photos")
        .then(function(response) {
            // Add the data to the ListView object
            listView.data = JSON.parse(response.response);

            // Show the first initial set after fetch
            listView.showMoreItems();

            // Allow the "Show more" button to display more items on click
            document.querySelector(".listview__btn").addEventListener("click", function(evt) {
                listView.showMoreItems();
            });

        }, function(response) {
            console.log("failure");
        });
})();
