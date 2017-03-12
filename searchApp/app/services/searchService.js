var searchService = (function(){
    var url = 'https://api.twitch.tv/kraken/search/streams?client_id=p7u367c89hr4ouomumvogv9hh5636f';
    function getQueryResults(query, callbacks, loader) {
        var q = url +
                '&limit=' + (query.limit || 10) +
                '&offset=' + (query.offset || 0)  +
                '&q=' + query.search;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 3) {
                loader(true);
            }

            //Simulating a loader effect
            if (this.readyState == 4 && this.status == 200) {
                setTimeout(processData, 1000)
            }


        };
        xhttp.open("GET", q, true);
        xhttp.send();

        function processData() {
            loader(false);
            var response = JSON.parse(xhttp.responseText);

            callbacks[0](response.streams);
            callbacks[1]({total: response._total,
                offset: query.offset,
                limit: query.limit,
                search: query.search,
                currentPage: response._total ? Math.ceil(query.offset/query.limit) + 1: 0,
                totalPages: Math.ceil(response._total/query.limit)

            });
        }
    }

    return {
        getQueryResults: getQueryResults
    }

})();