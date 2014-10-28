(function($) {
  'use strict';

  var CLASS_SELECTED = 'is-active';

  var EVENT_CLEAR = 'multiselect-clear';
  var EVENT_CHANGE = 'multiselect-change';

  var DATA_RANGE_START = 'multiselect-start';
  var DATA_ITEM_INDEX = 'multiselect-index';

  // Register multi-select source on lists
  $('[data-multiselect]').each(function() {

    var $list = $(this);

    $list.find('li').each(function(index) {

      var $item = $(this);

      $item.data(DATA_ITEM_INDEX, index);

      $item.on('click', function(event) {

        event.stopImmediatePropagation();
        event.preventDefault();

        var $clicked = $(event.target);
        var index = $clicked.data(DATA_ITEM_INDEX);

        if (event.shiftKey) {

          var start = $list.data(DATA_RANGE_START) || 0;
          var end = index;

          if (start > end) {
            end = start;
            start = index;
          }

          $list.find('li').slice(start, end + 1).addClass(CLASS_SELECTED);

        } else if (event.ctrlKey || event.metaKey) {

          $list.data(DATA_RANGE_START, index);
          $clicked.toggleClass(CLASS_SELECTED);

        } else {

          $list.data(DATA_RANGE_START, index);
          $list.children('li').removeClass(CLASS_SELECTED);
          $clicked.addClass(CLASS_SELECTED);

        }

        var payload = $list.find('li.' + CLASS_SELECTED);
        $('[data-multiselect-bind="' + $list.data('multiselect') + '"]').trigger(EVENT_CHANGE, [payload]);

      });

    });

    // Add clear-handler
    $list.on(EVENT_CLEAR, function() {

      $list.children('li').removeClass(CLASS_SELECTED);
      var payload = [];
      $('[data-multiselect-bind="' + $list.data('multiselect') + '"]').trigger(EVENT_CHANGE, [payload]);

    });

  });

  // Clicking on the body or html will clear the current selection */
  $('body, html').on('click', function() {

    $('[data-multiselect]').trigger(EVENT_CLEAR);

  });

})(jQuery);
