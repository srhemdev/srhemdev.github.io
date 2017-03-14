/**
 *  @class
 *  Pagination Header component
 *
 *  Contains:
 *  - Search box input to type in queries.
 *  - Search button to search for results for that query.
 *
 *  @param object param contains:
 *
 *  query(Object) - pass in the search query, limit, offset
 *
 *  callbacks(Array of functions) - callbacks to update feed and pagination header are
 *  added when the pagination header component is created.
 *
 *  @public methods:
 *  @method setPageHeader - Set the page header on initialisation and every query
 *          results/pagination update.
 *
 *  @private methods:
 *  @method moveLeft - Handler to handle left button click pagination.
 *  @method moveRight - Handler to handle right button click pagination.
 */


var paginationHeader = (function(w, d){
    function PaginationHeader(config) {
        var vm = this,
            el = d.getElementsByClassName(config.id)[0],
            leftButton,
            rightButton,
            totalPages,
            totalResultsValue,
            currentPage,
            currentOffset;

        vm.config = config;
        vm.config.callbacks = [];

        currentOffset = 0;

        //Pagination Header UI elements
        var paginationHeaderElement = '<div class="pagination-header flex-row space-between">\
                                            <div class="total-results">Total Results: \
                                                <span class="total-results-value">0</span>\
                                            </div>\
                                            <div class="pagination flex-row">\
                                                <div class="arrow-left disabled"></div>\
                                                <div class="values">\
                                                    <span class="current-page">0</span>/<span class="total-pages">0</span>\
                                                </div>\
                                                <div class="arrow-right disabled"></span>\
                                            </div>\
                                        </div>';

        el.innerHTML = paginationHeaderElement;

        leftButton = el.getElementsByClassName('arrow-left')[0];
        rightButton = el.getElementsByClassName('arrow-right')[0];
        totalPages = el.getElementsByClassName('total-pages')[0];
        currentPage = el.getElementsByClassName('current-page')[0];
        totalResultsValue = el.getElementsByClassName('total-results-value')[0];

        //Move left Button click event handler
        leftButton.addEventListener('click', moveLeft);

        //Move right Button click event handler
        rightButton.addEventListener('click', moveRight);

        vm.setPageHeader = setPageHeader;

        // Reset the header on header update
        function resetHeader() {
            commonService.removeClass(rightButton, 'disabled');
            commonService.removeClass(leftButton, 'disabled');

        }


        //Handler to handle left button click  pagination
        function moveLeft() {

            if(currentOffset === 0) {
                return;
            }

            currentOffset -= vm.config.query.limit;
            vm.config.query.offset = currentOffset;

            searchService.getQueryResults(vm.config.query, vm.config.callbacks, vm.config.loader);
        }

        //Handler to handle right button click pagination
        function moveRight() {

            if(currentOffset + vm.config.query.limit >= vm.config.query.total) {
                return;
            }

            currentOffset += vm.config.query.limit;
            vm.config.query.offset = currentOffset;

            searchService.getQueryResults(vm.config.query, vm.config.callbacks, vm.config.loader);
        }


        // Set the page header on initialisation and every query results/pagination update
        function setPageHeader(page) {
            resetHeader();

            currentPage.innerText = page.currentPage;
            totalPages.innerText = page.totalPages;
            totalResultsValue.innerText = page.total;

            vm.config.query = page;

            currentOffset = page.offset;

            //
            if(currentOffset === 0) {
                commonService.addClass(leftButton, 'disabled');
            }

            if(currentOffset + page.limit >= page.total) {
                commonService.addClass(rightButton, 'disabled');
            }

        }

        //set the callbacks in the config that need to be called on every
        // query result update(i.e. feed update and pagination header update)
        vm.config.callbacks.push(vm.config.callback, vm.setPageHeader);

    }

    return PaginationHeader;

})(window, document);