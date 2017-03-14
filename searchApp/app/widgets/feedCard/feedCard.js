/**
 * @class feedCard
 * Feed Card component
 * Contains:
 * - Feed card layout
 *
 * @param object param contains:
 *  cardId - Feed item id.
 *  img - Feed item url.
 *  url - Feed item url which we can navigate to on click.
 *  title - Feed item title.
 *  subtitle - Feed item game name.
 *  viewers - Feed item viewers.
 *  description - Feed item description.
 *
 *  @public methods:
 *  @method getFeedCard - Returns back the Feed card layout element
 *
 */

var feedCard = (function(w, d){
    function FeedCard(config) {
        var vm = this;

        //Feed card UI elements
        var feedCardElement = '<li data-card-id="'+ config.cardId +'" class="feed-card flex-row" >\
                               <div class="card-background-image">\
                                    <img class="feed-card-image" src="'+ config.img +'" alt="No Image"/>\
                                </div>\
                                <div class="feed-card-content flex-column">\
                                    <div class="title">\
                                    <a href="' + config.url + '" target="_blank">' + config.title + '</a></div>\
                                    <div class="subtitle">'+
                                        (config.subtitle || '-') + ' | ' +
                                        (config.viewers>=0 ? config.viewers : '-') +
                                    '</div>\
                                    <div class="description">'+ config.description +'</div>\
                                </div>\
                              </li>';

        //Method that returns the feed card layout.
        vm.getFeedCard = function() {
            return feedCardElement;
        }
    }

    return FeedCard;
})(window, document);