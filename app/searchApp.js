(function(w, d){


    var feed1 = new feed({id: 'search-results'});

    var paginationHeader1 = new paginationHeader({
        id: 'pagination-area',
        callback: feed1.populateFeed
    });

    var search1 = new search({id: 'search-area', callback: feed1.populateFeed});


})(window, document);