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
        searchBox, searchButton, recentSearches, list, clear;

        vm.config = config;
        vm.recentSearchValues = '';

        //Search Widget UI elements
        var searchElement = '<div class="search-widget flex-row">\
                                <input class="search-box" type="text" placeholder="Search query..." minlength="1" maxlength="100"/>\
                                <input class="search-button" type="button" value="Search"/>\
                                <div class="recent-searches hidden">\
                                    <ul class="recent-searches-list"></ul>\
                                    <div class="clear">Clear recent searches</div>\
                                </div>\
                             </div>';

        el.innerHTML = searchElement;

        searchBox = el.firstChild.children[0];
        searchButton = el.firstChild.children[1];
        recentSearches = el.firstChild.children[2];
        list = recentSearches.children[0];
        clear = el.getElementsByClassName('clear')[0];

        // Event listener for keydown event on the search box.
        // Whenever we hit enter(normal user interaction on search),
        // event is captured and search results are updated.
        searchBox.addEventListener('keydown', function(evt){
            if(evt.which===13) {
                vm.getSearchResults(this.value);
                commonService.addClass(recentSearches, 'hidden');
            } else {
                if(this.value !== '' && vm.recentSearchValues !== '') {
                    showRecentSearches();
                } else {
                    hideRecentSearches();
                }
            }

        });

        // Event listener for click event on the search button.
        // Whenever we hit the search button, event is captured
        // and search results are updated.
        searchButton.addEventListener('click', function(evt){
            commonService.addClass(recentSearches, 'hidden');
            vm.getSearchResults(searchBox.value);
        })

        clear.addEventListener('click', function(evt){
            searchService.clearRecentSearches();
            hideRecentSearches();
            vm.recentSearchValues = '';
        });

        list.addEventListener('click', function(evt){
            evt.stopPropagation();
            var target = evt.target || evt.srcElement;

            if(target.nodeName === 'LI') {
                vm.getSearchResults(target.innerText);
                searchBox.value = '';
                commonService.addClass(recentSearches, 'hidden');
            }
        });

        //disable recent search popup
        d.body.addEventListener('click', function(e) {
            commonService.addClass(recentSearches, 'hidden');
        });

        function hideRecentSearches() {
            commonService.addClass(recentSearches, 'hidden');
            list.innerHTML = '';
        }

        function showRecentSearches() {
            commonService.removeClass(recentSearches, 'hidden');
            list.innerHTML = vm.recentSearchValues;
        }



    }

    //Calls the getQueryResults from searchService
    Search.prototype.getSearchResults = function(s) {
        if(s === '') return;
        this.config.query.search = s;
        searchService.updateRecentSearches(s);
        this.recentSearchValues = this.buildRecentSearches();
        searchService.getQueryResults(this.config.query, this.config.callbacks, this.config.loader);
    }

    Search.prototype.buildRecentSearches = function() {
        var searches = searchService.getRecentSearches(),
            res = '';
        searches.forEach(function(item){
            res += '<li>' + item + '</li>'
        });
        return res;
    }

    return Search;

})(window, document);