/**
 * @service
 * commonService - can used across components
 *
 * @public methods:
 * @method hasClass - checks if an element has a class name.
 * @method addClass - adds a class name to an element.
 * @method removeClass - removes a class name from an element.
 * @method showLoader - displays loader class on an element.
 * @method hideLoader - hides loader class from an element.
 */

var commonService = (function(){
    function hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }

    function addClass(el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!hasClass(el, className)) el.className += " " + className
    }

    function removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className)
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className=el.className.replace(reg, ' ')
        }
    }

    function showLoader(el) {
        addClass(el, 'loader')
    }

    function hideLoader(el) {
        removeClass(el, 'loader')
    }

    return {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        showLoader: showLoader,
        hideLoader: hideLoader
    }

})();