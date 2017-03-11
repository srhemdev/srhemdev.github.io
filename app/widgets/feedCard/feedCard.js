var feedCard = (function(w, d){
    function feedCard(config) {
        var vm = this;

        var feedCardElement = '<li data-card-id="'+ config.cardId +'" class="feed-card flex-row">\
                                <div class="card-background-image">\
                                    <img class="feed-card-image" src="'+ config.img +'" alt="No Image"/>\
                                </div>\
                                <div class="feed-card-content flex-column">\
                                    <div class="title">'+ config.title +'</div>\
                                    <div class="subtitle">'+
                                        (config.subtitle || '-') + ' | ' +
                                        (config.viewers>=0 ? config.viewers : '-') +
                                    '</div>\
                                    <div class="description">'+ config.description +'</div>\
                                </div>\
                              </li>';

        vm.getFeedCard = function() {
            return feedCardElement;
        }
    }

    return feedCard;
})(window, document);