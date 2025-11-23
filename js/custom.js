/**
 * @file
 * Global utilities.
 *
 */

/**
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


(function (Drupal, $, once) {
  Drupal.behaviors.loginModalTrigger = {
    attach: function (context) {
      $(once('loginModalTrigger', '.js-open-login-popup', context))
        .on('click', function (e) {
          e.preventDefault();
          console.log('Button clicked, triggering modal');

          const modal = new bootstrap.Modal(document.getElementById('loginModal'));
          modal.show();
        });
    }
  };
})(Drupal, jQuery, once);

*/


(function (Drupal, $, once) {
  Drupal.behaviors.bootstrap_sass = {
    attach: function (context, settings) {

      // Desktop dropdown hover behavior
      if (window.matchMedia("(min-width: 992px)").matches) {
        $(once('dropdownHover', '.dropstart', context))
          .hover(
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

      // Login modal action
      $(once('loginModalTrigger', '.js-open-login-popup', context))
        .on('click', function (e) {
          e.preventDefault();

          const modalEl = document.getElementById('loginModal');
          if (!modalEl) return;

          const modal = new bootstrap.Modal(modalEl);
          modal.show();
        });

    }
  };
})(Drupal, jQuery, window.once);
