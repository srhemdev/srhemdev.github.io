/**
 * Lights control module
 * Inherits the methods from switchControl factory class
 * and has its own methods specific to its control
 */


var lightsControl = (function($){
        function lightsControl(config){
            //set the config for lights control.
            var vm = this,
                id = '#' + config.id,
                toggle,del,lightRange;

            vm.config = config;

            if(!vm.config.query) {
                vm.config.query ={range :  vm.config.range || '40'};
            }

            $(vm.config.parent).append('<div class="control" id="' + vm.config.id + '">\
                                        <div class="flex-row space-between">\
                                            <div>\
                                                <i class="material-icons">lightbulb_outline</i>Lights\
                                            </div>\
                                            <div class="flex-row">\
                                                <div class="toggle"  title="Lights On/Off"></div>\
                                                <i class="material-icons delete">cancel</i>\
                                            </div>\
                                        </div>\
                                            <div class="display flex-row hidden">\
                                            <input class="lightRange" type="range" step="3" \/>\
                                            </div>\
                                        </div>');

            toggle = $(id + ' .toggle');
            del = $(id + ' .delete');
            lightRange = $(id +' .lightRange');

            //init function to handle control initialization
            function init() {

                vm.get(vm.config);

                toggle.on('click', function(){
                    vm.toggle(vm.config);
                });

                del.on('click', function(){
                    vm.delete(vm.config);
                });

                lightRange.on('change', adjustLightRange);
            }

            //function to adjust light range from 0-100 on how dim, bright, too bright
            // you want the light to be.
            function adjustLightRange() {
                vm.config.range = lightRange.val();
                vm.config.query.range = vm.config.range;
                vm.updateData(vm.config);
            }

            init();
        }

        return lightsControl;
})(jQuery);