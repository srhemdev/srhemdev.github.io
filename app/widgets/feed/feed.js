var feed = (function(w, d){
    function feed(config) {
        var vm = this,
            el = d.getElementById(config.id);
        console.log(el)
        vm.config = config;

        var feedElement = '<ul class="feed"></ul>';
        var emptyMessage = '<div class="empty-message">No results to show</div>';
        console.log(feedElement)
        el.innerHTML = feedElement;

        vm.populateFeed = populateFeed;

        function populateFeed(results) {
            clearFeed();
            if(results.length) {
                results.forEach(function(index, result){
                    var config = {
                        id: el.querySelector('feed'),
                        title: result.title,
                        subtitle: result.subtitle,
                        img: result.image,
                        description: result.description,
                        cardId: index
                    }

                    var card = new feedCard(config);
                    feedElement.appendChild(card.getFeedCard());

                });
            } else {
                displayEmptyMessage();
            }
        }

        function clearFeed() {
            var eMsg = el.getElementsByClassName('empty-message');
            var feed = el.getElementsByClassName('feed')[0];

            if(eMsg[0]) {
                el.removeChild(emptyMessage);
            }

            if(feed.childNodes.length) {
                console.log(feed.childNodes.length)
                feed.childNodes.forEach(function(node){
                    feed.removeChild(node);
                })

            }
        }

        function displayEmptyMessage() {
            el.appendChild(emptyMessage);
        }
    }
    return feed;
})(window, document);