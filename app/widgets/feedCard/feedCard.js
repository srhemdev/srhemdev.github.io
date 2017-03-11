var feedCard = (function(w, d){
    function feedCard(config) {
        var vm = this,
            el = d.getElementById(config.id),
            title, subtitle, views, description;

        vm.config = config;

        var feedCardElement = '<li data-card-id="'+ vm.config.cardId +'" class="feed-card">\
                                <img class="feed-card-image" alt="No Image"/>\
                                <div class="feed-card-content">\
                                    <div class="title"></div>/\
                                    <div class="subtitle"></div>/\
                                    <div class="views"></div>\
                                    <div class="description"></div>\
                                </div>\
                              </li>';

        el.appendChild(feedCardElement);

        title = feedCardElement.getElementsByClassName('title')[0];
        subtitle = feedCardElement.getElementsByClassName('subtitle')[0];
        views = feedCardElement.getElementsByClassName('views')[0];
        description = feedCardElement.getElementsByClassName('description')[0];

        function populateContents() {
            title.innerText = vm.config.title;
            subtitle.innerText = vm.config.subtitle;
            views.innerText = vm.config.views;
            description.innerText = vm.config.description;
        }

        populateContents();

        vm.getFeedCard = function() {
            return feedCardElement;
        }
    }

    return feedCard;
})(window, document);