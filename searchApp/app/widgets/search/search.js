/**
 * @class
 * Search component
 *
 * Contains:
 * - Search box input to type in queries.
 * - Search button to search for results for that query.
 *
 * @param object param contains:
 *  id
 *  query(Object) - pass in the search query, limit, offset.
 *  callbacks(Array of functions) - callbacks to update feed and pagination header.
 *  loader(function) - loader callback triggered when results are updated after query change.
 *
 * @public methods:
 * @method getSearchResults - Triggers the getQueryResults from searchService
 *                            to fetch the query results.
 */

var search = (function(w, d){

    function Search(config) {
        var vm = this,
            el = d.getElementsByClassName(config.id)[0],
        searchBox, searchButton;

        vm.config = config;

        //Search Widget UI elements
        var searchElement = '<div class="search-widget flex-row">\
                                <input class="search-box" type="text" placeholder="Search query..." minlength="1" maxlength="100"/>\
                                <input class="search-button" type="button" value="Search"/>\
                             </div>';

        el.innerHTML = searchElement;

        searchBox = el.firstChild.children[0];
        searchButton = el.firstChild.children[1];

        // Event listener for keydown event on the search box.
        // Whenever we hit enter(normal user interaction on search),
        // event is captured and search results are updated.
        searchBox.addEventListener('keydown', function(evt){
            if(evt.which===13) {
                vm.getSearchResults(this.value);
            }
        });

        // Event listener for click event on the search button.
        // Whenever we hit the search button, event is captured
        // and search results are updated.
        searchButton.addEventListener('click', function(evt){
            vm.getSearchResults(searchBox.value);
        })
    }

    //Calls the getQueryResults from searchService
    Search.prototype.getSearchResults = function(s) {
        this.config.query.search = s;
        searchService.getQueryResults(this.config.query, this.config.callbacks, this.config.loader);
    }

    return Search;

})(window, document);