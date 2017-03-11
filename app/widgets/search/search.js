/**
 * Search component
 * Making the search a reusable component which can be attached to
 * any view we want to use it.
 */

var search = (function(w, d){

    function Search(config) {
        var vm = this,
        el = d.getElementById(config.id),
        searchBox, searchButton;

        vm.config = config;

        var searchElement = '<input class="search-box" type="text" minlength="1" maxlength="100"/>\
                             <input class="search-button" type="button" value="Search"/>';

        el.innerHTML = searchElement;

        searchBox = el.children[0];
        searchButton = el.children[1];

        searchBox.addEventListener('keydown', function(evt){
            if(evt.which===13) {
                vm.getSearchResults(this.value);
            }
        });

        searchButton.addEventListener('click', function(evt){
            vm.getSearchResults(searchBox.value);
        })
    }

    Search.prototype.getSearchResults = function(s) {
        this.config.query.search = s;
        searchService.getQueryResults(this.config.query, this.config.callbacks);
    }

    return Search;

})(window, document);