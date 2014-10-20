(function($) {
  'use strict';

  // 1. Register multiselect sources
  $('[data-multiselect]').each(function (_, el) {
    console.log('Registering ', el);
  });


  /* Clicking on the body or html area will 'clear' the current selection */
  $('body, html').on('click', function(ev) {
    $('[nope-data-multiselect]').trigger('clear');
  });

  /* Initialize the widget for any list with the behaviour class 'js-toggle' */
  $('ul[nope-data-multiselect]').each(function(_, ul) {

    /* The list (ul) is our root element */
    var that = this;

    /* LI toggles are gathered as a complete state */
    $(that).on('multiselect', function(_) {
      var state = [];
      $(that).find('li.is-active').each(function(i, el) {
        state[state.length] = el.textContent;
      });

      /* Notify listeners */
      $('[data-multiselect-on]').trigger('multiselect', [state]);
    });

    /* All the list items known */
    var all = [];

    /* Last toggled item */
    var last = null;

    /* List item => item index (number) */
    var index = {};

    /* Clear all toggles */
    $(that).on('clear', function(_) {
      $(that).find('li').removeClass('is-active');
      $(that).trigger('toggled');
      last = all[0];
    });

    /* Initialize list item handlers */
    $(ul).find('li').each(function(i, li) {

      /* Add index property to element */
      li['js-toggle-id'] = i;

      /* Save to all-collection */
      all[all.length] = li;

      /* Last toggled is first list item by default */
      last = all[0];

      /* Handle click on list item */
      $(li).on('click', function clickedListItem(ev) {

        /* Current normal and jQuery-wrapped element */
        var current = ev.target;
        var $current = $(current);

        /* Don't let this click slip away */
        ev.stopImmediatePropagation();
        ev.preventDefault();

        /* Handle range-selection */
        if (ev.shiftKey) {

          var range = [];

          range[0] = last['js-toggle-id'];
          range[1] = current['js-toggle-id'];

          if (range[0] > range[1]) {
            range.reverse();
          }

          $('li', that).slice(range[0], range[1] + 1).addClass('is-active');

          /* Handle multi-select */
        } else if (ev.ctrlKey || ev.metaKey) {

          $current.toggleClass('is-active');
          last = current;

          /* Handle single, toggle select */
        } else {

          /* Clear all selection first */
          $(all).each(function(_, el) {
            $(el).removeClass('is-active');
          });

          $current.toggleClass('is-active');
          last = current;
        }

        /* Trigger that selection changed */
        $(that).trigger('js-toggle-changed');
      });
    });
  });

})(jQuery);
