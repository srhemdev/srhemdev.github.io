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

        searchBox = el.childNodes[0];
        searchButton = el.childNodes[1];

        searchBox.addEventListener('keydown', function(evt){
            if(evt.which===13) {
                console.log('enter', this.value)
                vm.getSearchResults(this.value);
            }
        });

        searchButton.addEventListener('click', function(evt){
            console.log(searchBox.value);
            vm.getSearchResults(searchBox.value);
        })
    }

    Search.prototype.getSearchResults = function(query) {
        searchService.getQueryResults(query, this.config.callback);
    }

    return Search;

})(window, document);