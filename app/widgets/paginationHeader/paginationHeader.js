var paginationHeader = (function(w, d){
    function paginationHeader(config) {
        var vm = this,
            el = d.getElementById(config.id),
            leftButton, rightButton, totalPages, currentPage, totalResultsValue;

        vm.config = config;
        vm.config.callbacks = [];
        vm.pageNo = 1;

        var paginationHeaderElement = '<div class="pagination-header>\
                                            <div class="total-results">Total Results\
                                                <span class="total-results-value"></span>\
                                            </div>\
                                            <div class="pagination">\
                                                <span class="move-left">Left</span>\
                                                <span class="current-page"></span>/<span class="total-pages"></span>\
                                                <span class="move-right">Right</span>\
                                            </div>\
                                        </div>';

        el.innerHTML = paginationHeaderElement;

        leftButton = el.getElementsByClassName('move-left')[0];
        rightButton = el.getElementsByClassName('move-right')[0];
        totalPages = el.getElementsByClassName('total-pages')[0];
        currentPage = el.getElementsByClassName('current-page')[0];
        totalResultsValue = el.getElementsByClassName('total-results-value')[0];


        leftButton.addEventListener('click', function(evt){
            if(commonService.hasClass(leftButton, 'gray')) {
                commonService.removeClass(leftButton, 'gray')
            }
            vm.pageNo--;
            vm.config.currentOffset -= vm.config.query.limit;
            vm.config.query.offset = vm.config.currentOffset;
            if(vm.config.currentOffset < 0) {
                commonService.addClass(leftButton, 'gray');
                return;
            }
            vm.moveLeft()
        });

        rightButton.addEventListener('click', function(evt){
            if(commonService.hasClass(rightButton, 'gray')) {
                commonService.removeClass(rightButton, 'gray')
            }
            vm.pageNo++;
            vm.config.currentOffset += vm.config.query.limit;
            vm.config.query.offset = vm.config.currentOffset;
            if(vm.config.currentOffset > vm.config.query.total) {
                commonService.addClass(rightButton, 'gray');
                return;
            }
            vm.moveRight();
        });

        vm.setPageHeader = function(page) {
            currentPage.innerText = vm.pageNo;
            totalPages.innerText = Math.round(page.total/page.limit) + 1;
            totalResultsValue.innerText = page.total;
            vm.config.query = page;
            vm.config.currentOffset = page.offset;
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