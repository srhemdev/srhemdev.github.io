var paginationHeader = (function(w, d){
    function paginationHeader(config) {
        var vm = this,
            el = d.getElementById(config.id),
            leftButton, rightButton, totalPages, currentPage, totalResultsValue;

        console.log(el,"el")
        vm.config = config;

        var paginationHeaderElement = '<div class="pagination-header>\
                                            <div class="total-results">Total Results\
                                                <span class="total-results-value"></span>\
                                            </div>\
                                            <div class="pagination">\
                                                <span class="move-left"></span>\
                                                <span class="current-page"></span>\
                                                <span class="total-pages"></span>\
                                                <span class="move-right"></span>/\
                                            </div>\
                                        </div>';

        el.innerHTML = paginationHeaderElement;

        leftButton = el.getElementsByClassName('move-left')[0];
        rightButton = el.getElementsByClassName('move-right')[0];
        totalPages = el.getElementsByClassName('total-pages')[0];
        currentPage = el.getElementsByClassName('current-page')[0];
        totalResultsValue = el.getElementsByClassName('total-results-value')[0];


        leftButton.addEventListener('click', function(evt){
            vm.config.currentPage--;
            vm.config.query.currentPage = vm.config.currentPage;
            paginationHeader.moveLeft()
        });

        rightButton.addEventListener('click', function(evt){
            vm.config.currentPage++;
            vm.config.query.currentPage = vm.config.currentPage;
            paginationHeader.moveRight();
        });
    }

    paginationHeader.prototype.moveLeft = function() {
        searchService.getQueryResults(this.config.query, this.config.moveLeftCallback);
    }

    paginationHeader.prototype.moveRight = function(query) {
        searchService.getQueryResults(this.config.query, this.config.moveRightCallback);
    }

    return paginationHeader;

})(window, document);