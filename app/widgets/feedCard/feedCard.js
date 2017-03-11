var feedCard = (function(w, d){
    function feedCard(config) {
        var vm = this;

        var feedCardElement = '<li data-card-id="'+ config.cardId +'" class="feed-card">\
                                <img class="feed-card-image" src="'+ config.img +'" alt="No Image"/>\
                                <div class="feed-card-content">\
                                    <div class="title">'+ config.title +'</div>\
                                    <div class="subtitle">'+ config.subtitle +'</div>\
                                    <div class="viewers">'+ config.viewers +'</div>\
                                    <div class="description">'+ config.description +'</div>\
                                </div>\
                              </li>';

        vm.getFeedCard = function() {
            return feedCardElement;
        }
    }

    return feedCard;
})(window, document);