var searchService = (function(){
    var url = 'https://api.twitch.tv/kraken/search/streams?client_id=p7u367c89hr4ouomumvogv9hh5636f';
    function getQueryResults(query, callbacks) {
        var q = url +
                '&limit=' + (query.limit || 10) +
                '&offset=' + (query.offset || 0)  +
                '&q=' + query.search;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);

                callbacks[0](response.streams);
                callbacks[1]({total: response._total,
                              offset: query.offset,
                              limit: query.limit,
                              search: query.search,
                              currentPage: response._total ? Math.ceil(query.offset/query.limit) + 1: 0,
                              totalPages: Math.ceil(response._total/query.limit)

                });
            }
        };
        xhttp.open("GET", q, true);
        xhttp.send();
    }

    return {
        getQueryResults: getQueryResults
    }

})();