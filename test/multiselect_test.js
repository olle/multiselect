(function($) {

    module('jQuery#multiselect');

    test('is chainable', function () {
	ok($('.items').multiselect().addClass('foobar'), 'Returns proper jQuery object');
    });
    
    test('default options', function () {
	var oldOptions = $.extend({}, $.multiselect.options);

	ok($.multiselect.options, 'Options are public');

	equal($.multiselect.options.selectedClass, 'is-selected', 'Default selected class');
	$.multiselect.options.selectedClass = 'modified-selectedClass';
	equal($.multiselect.options.selectedClass, 'modified-selectedClass', 'Selected class configured');

	$.multiselect.options = oldOptions;
    });

    test('toggles selected', function () {
	$('.items').multiselect();
	$('.items li:last').click();
	equal($('.items li:last').attr('class'), $.multiselect.options.selectedClass, 'Toggle selected on click');
	$('.items li:last').click();
	equal($('.items li:last').attr('class'), '', 'Toggle selected on click');
    });

    test('emits event', 1, function () {
	$('.items').multiselect(function () {
	    ok(true);
	});
	$('.items li:first').click();
    });

    test('emits state', 4, function () {
	var acc = [];
	$('.items').multiselect(function (state) {
	    acc[acc.length] = state;
	});

	$('.items li:first').click();
	equal(acc.length, 1, 'State was emitted');
	equal(acc[0].length, 1, 'One is selected');
	
	$('.items li:last').click();
	equal(acc.length, 2, 'State was emitted');
	equal(acc[1].length, 2, 'Two are selected');
    });

}(jQuery));
