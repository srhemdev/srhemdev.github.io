/**
 * @service
 * searchService - can be used across search specific components.
 *
 * @private methods:
 * @method processData - Change the shape of the response format you would like to send to
 *                       the requesting components.
 *
 * @public methods:
 * @method getQueryResults - Makes JSONP call to fetch the query results.
 * @method fetchResults - JSONP callback to get the response from the API.
 */


var searchService = (function(w, d){
    var url = 'https://api.twitch.tv/kraken/search/streams?client_id=p7u367c89hr4ouomumvogv9hh5636f',
        loader, callbacks, query;

    function getQueryResults(q, cbs, ldr) {
        if(q && q.search === '') return;
        var searchQuery = url +
                         '&callback=searchService.fetchResults' +
                         '&limit=' + (q.limit || 10) +
                         '&offset=' + (q.offset || 0)  +
                         '&q=' + q.search;

        loader = ldr;
        callbacks = cbs;
        query = q;

        //make JSONP request to get response.
        function getJSONPResponse() {
            var s = d.createElement("script");
            s.src = searchQuery;
            d.body.appendChild(s);
        }

        //show loader
        loader(true);
        getJSONPResponse();

        /**
         * Please note alternatively, we can use ajax request to fetch the
         * data as well as long as we have a client id.
         * Additionally it is easier to simulate loaders on pending and complete
         * state.
         *      var xhttp = new XMLHttpRequest();
         *      xhttp.onreadystatechange = function() {
         *      if (this.readyState == 3) {
         *          loader(true);
         *      }
         *
         *      //Simulating a loader effect
         *      if (this.readyState == 4 && this.status == 200) {
         *          setTimeout(processData, 1000)
         *      }
         *
         *      };
         *      xhttp.open("GET", q, true);
         *      xhttp.send();
         */

    }

    function fetchResults(data) {
        //Simulating a loader effect
        setTimeout(function(){processData(data);}, 0)
    }

    //Handler to trigger callbacks to populateFeed and update pagination header.
    function processData(data) {

        var response = data;

        //Hide loader
        loader(false);

        //Populate feed callback
        callbacks[0](response.streams);

        //Pagination header update callback
        callbacks[1]({total: response._total,
            offset: query.offset,
            limit: query.limit,
            search: query.search,
            currentPage: response._total ? Math.ceil(query.offset/query.limit) + 1: 0,
            totalPages: Math.ceil(response._total/query.limit)
        });
    }

    return {
        getQueryResults: getQueryResults,
        fetchResults: fetchResults
    }

})(window, document);