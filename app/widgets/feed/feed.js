var feed = (function(w, d){
    function feed(config) {
        var vm = this,
            el = d.getElementById(config.id), feed, emptyMessage;

        vm.config = config;
        vm.populateFeed = populateFeed;

        el.innerHTML = '<ul class="feed"></ul><div class="empty-message">No results to show</div>';

        emptyMessage = el.getElementsByClassName('empty-message')[0];
        feed = el.getElementsByClassName('feed')[0];

        function populateFeed(results) {
            clearFeed();

            if(results.length) {
                var fragment = '';
                results.forEach(function(result){
                    var config = {
                        title: result.channel.display_name,
                        subtitle: result.game,
                        img: result.preview.template.replace('{width}x{height}', '60x60'),
                        description: result.channel.status,
                        cardId: result._id,
                        viewers: result.viewers,
                        url: result.channel.url
                    }
                    fragment += new feedCard(config).getFeedCard();

                });
                feed = el.getElementsByClassName('feed')[0];
                feed.innerHTML = fragment;
            } else {
                displayEmptyMessage();
            }

        }

        function clearFeed() {
            if(!commonService.hasClass(emptyMessage, 'hidden')) {
                commonService.addClass(emptyMessage, 'hidden');
            }
            feed.innerHTML ='';
        }

        function displayEmptyMessage() {
            if(commonService.hasClass(emptyMessage, 'hidden')) {
                commonService.removeClass(emptyMessage, 'hidden');
            }
        }
    }
    return feed;
})(window, document);