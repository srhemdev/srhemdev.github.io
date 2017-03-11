var paginationHeader = (function(w, d){
    function paginationHeader(config) {
        var vm = this,
            el = d.getElementById(config.id),
            leftButton,
            rightButton,
            totalPages,
            totalResultsValue,
            currentPage,
            currentOffset;

        vm.config = config;
        vm.config.callbacks = [];

        currentOffset = 0;


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


        leftButton.addEventListener('click', moveLeft);

        rightButton.addEventListener('click', moveRight);

        vm.setPageHeader = setPageHeader;

        function resetHeader() {
            commonService.removeClass(rightButton, 'disabled');
            commonService.removeClass(leftButton, 'disabled');

        }

        function moveLeft() {
            if(commonService.hasClass(rightButton, 'disabled')) {
                commonService.removeClass(rightButton, 'disabled')
            }

            if(currentOffset === 0) {
                return;
            }

            currentOffset -= vm.config.query.limit;
            vm.config.query.offset = currentOffset;

            vm.moveLeft();
        }

        function moveRight() {
            if(commonService.hasClass(leftButton, 'disabled')) {
                commonService.removeClass(leftButton, 'disabled')
            }

            if(currentOffset + vm.config.query.limit >= vm.config.query.total) {
                return;
            }

            currentOffset += vm.config.query.limit;
            vm.config.query.offset = currentOffset;
            vm.moveRight();
        }

        function setPageHeader(page) {
            resetHeader();

            currentPage.innerText = page.currentPage;
            totalPages.innerText = page.totalPages;
            totalResultsValue.innerText = page.total;

            vm.config.query = page;

            currentOffset = page.offset;

            if(currentOffset === 0) {
                commonService.addClass(leftButton, 'disabled');
            }

            if(currentOffset + page.limit >= page.total) {
                commonService.addClass(rightButton, 'disabled');
            }

        }

        vm.config.callbacks.push(vm.config.callback, vm.setPageHeader);

    }


    paginationHeader.prototype.moveLeft = function() {
        searchService.getQueryResults(this.config.query, this.config.callbacks);
    }

    paginationHeader.prototype.moveRight = function() {
        searchService.getQueryResults(this.config.query, this.config.callbacks);
    }

    return paginationHeader;

})(window, document);