//# sourceURL=smartRUtils.js

'use strict';

angular.module('smartRApp').factory('smartRUtils', ['$q', 'CohortSharingService', function($q,
                                                                                           CohortSharingService) {

    var service = {};

    var nodeToKey = function (node) {
        return node.restObj.key;
    };

    service.conceptBoxMapToConceptKeys = function smartRUtils_conceptBoxMapToConceptKeys(conceptBoxMap) {
        var allConcepts = {};
        Object.keys(conceptBoxMap).forEach(function(group) {
            var concepts = conceptBoxMap[group].concepts;
            concepts.forEach(function(concept, idx) {
                allConcepts[group + '_' + 'n' + idx] = nodeToKey(concept);
            });
        });
        return allConcepts;
    };

    /**
     * Creates a CSS safe version of a given string
     * This should be used consistently across the whole of SmartR to avoid data induced CSS errors
     *
     * @param str
     * @returns {string}
     */
    service.makeSafeForCSS = function smartRUtils_makeSafeForCSS(str) {
        return String(str).replace(/[^a-z0-9]/g, function(s) {
            var c = s.charCodeAt(0);
            if (c === 32) {
                return '-';
            }
            if (c >= 65 && c <= 90) {
                return '_' + s.toLowerCase();
            }
            return '__' + ('000' + c.toString(16)).slice(-4);
        });
    };

    service.getElementWithoutEventListeners = function(cssSelector) {
        var element = document.getElementById(cssSelector);
        var copy = element.cloneNode(true);
        element.parentNode.replaceChild(copy, element);
        return copy;
    };

    service.shortenConcept = function smartRUtils_shortenConcept(concept) {
        var split = concept.split('\\');
        split = split.filter(function(str) { return str !== ''; });
        return split[split.length - 2] + '/' + split[split.length - 1];
    };

    // Calculate width of text from DOM element or string. By Phil Freo <http://philfreo.com>
    $.fn.textWidth = function(text, font) {
        if (!$.fn.textWidth.fakeEl) {
            $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
        }
        $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
        return $.fn.textWidth.fakeEl.width();
    };

    service.getTextWidth = function(text, font) {
        return $.fn.textWidth(text, font);
    };

    /**
     * Executes callback with scroll position when SmartR mainframe is scrolled
     * @param function
     */
    service.callOnScroll = function(callback) {
        $('#sr-index').parent().scroll(function() {
            var scrollPos = $(this).scrollTop();
            callback(scrollPos);
        });
    };

    service.prepareWindowSize = function(width, height) {
        $('#heim-tabs').css('min-width', parseInt(width) + 25);
        $('#heim-tabs').css('min-height', parseInt(height) + 25);
    };

    /**
    * removes all kind of elements that might live out of the viz directive (e.g. tooltips, contextmenu, ...)
    */
    service.cleanUp = function() {
        $('.d3-tip').remove();
    };

    service.countCohorts = function() {
        return CohortSharingService.getSelection().length;
    };

    service.getSubsetIds = function smartRUtil_getSubsetIds() {
        var defer = $q.defer();
        defer.resolve(CohortSharingService.getSelection());
        return defer.promise;
    };

    return service;
}]);
