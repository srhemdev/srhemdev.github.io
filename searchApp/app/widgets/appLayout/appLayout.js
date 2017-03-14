/**
 * @class appLayout
 * appLayout module is used to specify the general layout of a search app.
 * Contains:
 *  - search area - contains search widget
 *  - search results area contains
 *  - pagination area contains pagination widget.
 *  - search results contains feed widget.
 *
 *  @param object param contains:
 *  id - element id to which the layout needs to be appended.
 *
 *  @private methods:
 *  @method toggleLoader - hide/show loader on whole search results are when search results
 *                         are being updated.
 *  @method init - instantiate feed, search, paginationHeader components required for app layout.
 *
 */

var appLayout = (function(w, d){
    function appLayout(config) {
        var vm = this,
            el = d.getElementById(config.id),
            searchResultsArea;

        // seach app layout injected into the element provided by config id
        el.innerHTML = '<div class="search-area"></div>\
                        <div class="search-results-area">\
                            <div class="pagination-area"></div>\
                            <div class="search-results"></div>\
                        </div>';

        searchResultsArea = d.getElementsByClassName('search-results-area')[0];

        // hide/show loader on whole search results are when search results are being
        // updated.
        function toggleLoader(value) {
            if(value) {
                commonService.showLoader(searchResultsArea);
            } else {
                commonService.hideLoader(searchResultsArea);
            }
        }

        //instantiate all the components required for app layout
        function init() {
            var feedComponent = new feed({id: 'search-results'}),
                paginationHeaderComponent = new paginationHeader({
                id: 'pagination-area',
                callback: feedComponent.populateFeed,
                loader: toggleLoader
                }),
                searchComponent = new search({
                id: 'search-area',
                query: {
                    limit: 20,
                    offset: 0
                },
                callbacks: [feedComponent.populateFeed, paginationHeaderComponent.setPageHeader],
                loader: toggleLoader
            });

        }

        init();

    }
    return appLayout;
})(window, document);