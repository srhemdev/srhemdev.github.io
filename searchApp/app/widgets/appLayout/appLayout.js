var appLayout = (function(w, d){
    function appLayout(config) {
        var vm = this,
            el = d.getElementById(config.id),
            searchResultsArea;


        el.innerHTML = '<div class="search-area"></div>\
                        <div class="search-results-area">\
                            <div class="pagination-area"></div>\
                            <div class="search-results"></div>\
                        </div>';


        vm.toggleLoader = toggleLoader;

        searchResultsArea = d.getElementsByClassName('search-results-area')[0];

        function toggleLoader(value) {
            if(value) {
                commonService.showLoader(searchResultsArea);
            } else {
                commonService.hideLoader(searchResultsArea);
            }
        }

    }
    return appLayout;
})(window, document);