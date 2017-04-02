/**
 * Temperature control module
 * Inherits the methods from switchControl factory class
 * and has its own methods specific to its control
 */


var temperatureControl = (function($){


    function temperatureControl(config){
        //set the config for temperature control.
        var vm = this,
            id = '#' + config.id,
            toggle, del, arrowUp, arrowDown, temperature, metric;

        vm.config = config;

        if(!vm.config.query) {
            vm.config.query = {temperature :  vm.config.temperature || '40'};
        }

        //init function to handle control initialization
        function init() {
            vm.get(vm.config);

            $(vm.config.parent).append('<div class="control" id="' + vm.config.id + '">\
                                            <div class="flex-row space-between">\
                                               <div><i class="material-icons">filter_drama</i>Temperature</div>\
                                               <div class="flex-row">\
                                                    <div class="toggle"  title="Thermometer On/Off"></div>\
                                                    <i class="material-icons delete">cancel</i>\
                                               </div>\
                                            </div>\
                                           <div class="flex-row temperatureDigits" title="Thermometer On/Off">\
                                               <span class="temperatureValue"></span>\
                                               <span class="temp-metric"><a class="celcius active">°C</a> | <a class="farenheit">°F</a></span>\
                                           </div>\
                                           <div class="display flex-row hidden arrows">\
                                               <i title="Decrease temperature" class="material-icons arrow-down no-select">keyboard_arrow_down</i>\
                                               <i title="Increase temperature" class="material-icons arrow-up no-select">keyboard_arrow_up</i>\
                                           </div>\
                                        </div>');


            toggle = $(id + ' .toggle');
            del = $(id + ' .delete');
            arrowUp = $(id +' .arrow-up');
            arrowDown = $(id +  ' .arrow-down');
            temperature = $(id +' .temperatureValue');
            metric = $(id +' .temp-metric');

            updateTemperature();

            metric.on('click', changeMetric);
            arrowUp.on('click', increaseTemperature);
            arrowDown.on('click', decreaseTemperature);

            toggle.on('click', function(){
                vm.toggle(vm.config);
            });

            del.on('click', function(){
                vm.delete(vm.config);
            });
        }

        //Handler to update temperature text
        function updateTemperature() {
            temperature.text(vm.config.temperature);
        }

        //Handler to increase temperature
        function increaseTemperature() {
            if(arrowDown.hasClass('disabled')) {
                arrowDown.removeClass('disabled');
            }

            if(vm.config.temperature === 32 || vm.config.temperature === 90) {
                arrowUp.addClass('disabled');
                return;
            }
            vm.config.temperature++;
            updateTemperature();
            vm.config.query.temperature =  vm.config.temperature;

            vm.updateData(vm.config);
        }

        //Handler to decrease temperature
        function decreaseTemperature() {
            if(arrowUp.hasClass('disabled')) {
                arrowUp.removeClass('disabled');
            }

            if(vm.config.temperature === 16 || vm.config.temperature === 61) {
                arrowDown.addClass('disabled');
                return;
            }
            vm.config.temperature--;
            updateTemperature();
            vm.config.query.temperature =  vm.config.temperature;
            vm.updateData(vm.config);
        }

        //Toggle between Celcisus/Farenheit Selections
        function changeMetric(evt) {
            $(id +' .temp-metric').find('a').removeClass("active");
            var target = $(evt.target);
            if(evt.target.className === 'celcius') {
                target.addClass('active');
                convertTemperature('celcius');
            } else if(evt.target.className === 'farenheit') {
                target.addClass('active');
                convertTemperature('farenheit');
            }
        }


        //Formula to convert between celcius & farenheit
        function convertTemperature(type) {
            var result = vm.config.temperature;
            if(type === 'farenheit') {
                result= Math.round((result *9)/5 + 32);
            } else if(type === 'celcius') {
                result= Math.round(((result - 32) * 5)/9);
            }

            vm.config.temperature = result;

            updateTemperature();
        }
        init();
    }

    return temperatureControl;
})(jQuery);
