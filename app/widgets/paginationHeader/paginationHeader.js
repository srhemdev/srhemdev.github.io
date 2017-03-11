var paginationHeader = (function(w, d){
    function paginationHeader(config) {
        var vm = this,
            el = d.getElementById(config.id),
            leftButton, rightButton, totalPages, currentPage, totalResultsValue;

        vm.config = config;
        vm.config.callbacks = [];
        vm.pageNo = 1;

        var paginationHeaderElement = '<div class="pagination-header flex-row space-between">\
                                            <div class="total-results">Total Results: \
                                                <span class="total-results-value">0</span>\
                                            </div>\
                                            <div class="pagination flex-row">\
                                                <div class="arrow-left"></div>\
                                                <div class="values">\
                                                    <span class="current-page">0</span>/<span class="total-pages">0</span>\
                                                </div>\
                                                <div class="arrow-right"></span>\
                                            </div>\
                                        </div>';

        el.innerHTML = paginationHeaderElement;

        leftButton = el.getElementsByClassName('arrow-left')[0];
        rightButton = el.getElementsByClassName('arrow-right')[0];
        totalPages = el.getElementsByClassName('total-pages')[0];
        currentPage = el.getElementsByClassName('current-page')[0];
        totalResultsValue = el.getElementsByClassName('total-results-value')[0];


        leftButton.addEventListener('click', function(evt){
            if(commonService.hasClass(rightButton, 'disable')) {
                commonService.removeClass(rightButton, 'disable')
            }
            if(vm.pageNo == 1) {
                return;
            }
            vm.pageNo--;
            vm.config.currentOffset -= vm.config.query.limit;
            vm.config.query.offset = vm.config.currentOffset;

            vm.moveLeft()
        });

        rightButton.addEventListener('click', function(evt){
            if(commonService.hasClass(leftButton, 'disable')) {
                commonService.removeClass(leftButton, 'disable')
            }

            if(vm.pageNo == vm.config.query.totalPages) {
                return;
            }
            vm.pageNo++;
            vm.config.currentOffset += vm.config.query.limit;
            vm.config.query.offset = vm.config.currentOffset;
            vm.moveRight();
        });

        vm.setPageHeader = function(page) {

            currentPage.innerText = vm.pageNo;
            totalPages.innerText = page.totalPages;
            totalResultsValue.innerText = page.total;

            vm.config.query = page;
            vm.config.currentOffset = page.offset;

            if(vm.pageNo == vm.config.query.totalPages) {
                commonService.addClass(rightButton, 'disable');
            }

            if(vm.pageNo == 1) {
                commonService.addClass(leftButton, 'disable');
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