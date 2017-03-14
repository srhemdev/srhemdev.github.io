/**
 *  @class feed
 *  Feed List component
 *  Contains:
 *  - Feed layout
 *
 *  @param object param contains:
 *  config:
 *  id - Get the id of the element to which you want to attach this feed
 *       component to.
 *
 *  @public methods:
 *  @method populateFeed - Populates the feed with new search results based on the query.
 *
 */


var feed = (function(w, d){
    function Feed(config) {
        var vm = this,
            el = d.getElementsByClassName(config.id)[0],
            feed, emptyMessage;

        vm.config = config;
        vm.populateFeed = populateFeed;

        el.innerHTML = '<ul class="feed"></ul><div class="empty-message">No results to show</div>';

        emptyMessage = el.getElementsByClassName('empty-message')[0];
        feed = el.getElementsByClassName('feed')[0];


        //each time this function is called, clear the feed and re-render the results.
        //create instances of the cards.
        function populateFeed(results) {
            clearFeed();

            if(results.length) {
                var fragment = '';
                results.forEach(function(result){
                    var config = {
                        title: result.channel.display_name,
                        subtitle: result.game,
                        img: result.preview.template.replace('{width}x{height}', '120x90'),
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

        //Handler to clear the feed
        function clearFeed() {
            if(!commonService.hasClass(emptyMessage, 'hidden')) {
                commonService.addClass(emptyMessage, 'hidden');
            }
            feed.innerHTML ='';
        }

        //Handler to display empty message
        function displayEmptyMessage() {
            if(commonService.hasClass(emptyMessage, 'hidden')) {
                commonService.removeClass(emptyMessage, 'hidden');
            }
        }
    }
    return Feed;
})(window, document);