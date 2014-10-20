/*
 * multiselect
 * https://github.com/olle/multiselect
 *
 * Copyright (c) 2014 Olle Törnström
 * Licensed under the MIT license.
 */
;(function ($) {

    $.fn.multiselect = function (callbackOrDeferred) {
	
	var callback = callback || function () {};
	var opts = $.extend({}, $.multiselect.options, opts);
	return this.each(function () {
	    var that = this;
	    $('li', this).each(function (_, li) {
		$(li).on('click', function (ev) {
		    $(ev.target).toggleClass(opts.selectedClass);
		    callback($('li.' + opts.selectedClass. that).elements());
		});
	    });
	});
    };
    /*
	console.log('Starting multiselect init...');
	$('ul.' + opts.handlerClass).each(function (_, ul) {
	    $('li', ul).each(function (_, li) {
		$(li).on('click', function (ev) {
		    $(ev.target).toggleClass(opts.selectedClass);
		});
	    });
	});
	console.log('..done');
    });
   */

    // Global, configurable, default options
    $.fn.multiselect.options = {
	/* Marks selected list item */
	selectedClass : 'is-selected',
	/* Notified when the selection changes */
	selectedEvent : 'selected'
    };

    $.multiselect = $.fn.multiselect;
    
})(jQuery);
