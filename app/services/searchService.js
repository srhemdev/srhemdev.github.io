var searchService = (function(){
    var url = 'https://api.twitch.tv/kraken/search/streams?q=';
    function getQueryResults(query, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText,"this.responseText")
                //callback(JSON.parse(this.responseText));
            }
        };
        xhttp.open("GET", url + query + '&callback=foo', true);
        xhttp.send();
    }

    return {
        getQueryResults: getQueryResults
    }

})();