/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.bootstrap_sass = {
    attach: function(context, settings) {

      // Custom code here
     
     

    }
  };

})(jQuery, Drupal);

(function ($) {
  $(document).ready(function () {
    // Only apply hover on desktop
    if (window.matchMedia("(min-width: 992px)").matches) {
      $('.dropstart').hover(
        function () {
          $(this).addClass('show');
          $(this).find('.dropdown-menu').addClass('show');
        },
        function () {
          $(this).removeClass('show');
          $(this).find('.dropdown-menu').removeClass('show');
        }
      );
    }
  });
})(jQuery);