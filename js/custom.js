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


  // Kasada send interest modal - close on overlay click
  Drupal.behaviors.kasadaModalClose = {
    attach: function (context) {
      // Use a flag to ensure we only attach the handler once globally
      if (!window.kasadaOverlayHandlerAttached) {
        $(document).on('click', '.ui-widget-overlay', function (e) {
          // Find the visible dialog wrapper
          var $dialogWrapper = $('.ui-dialog:visible');

          if ($dialogWrapper.length) {
            // Get the actual dialog content element
            var $dialogContent = $dialogWrapper.find('.ui-dialog-content');

            if ($dialogContent.length) {
              // Call close on the actual content element that has the dialog initialized
              $dialogContent.dialog('close');
            }
          }
        });

        window.kasadaOverlayHandlerAttached = true;
      }
    }
  };


  // Social login spinner feedback.
  Drupal.behaviors.socialLoginFeedback = {
    attach: function (context) {
      once('social-login-feedback', '.socil-login-link', context)
        .forEach(function (el) {
          el.addEventListener('click', function () {
            el.classList.add('is-loading');
            el.setAttribute('aria-disabled', 'true');
            el.style.pointerEvents = 'none';
            var originalHTML = el.innerHTML;
            el.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Connecting to Google\u2026';

            // Reset if user navigates back (bfcache restore).
            window.addEventListener('pageshow', function (e) {
              if (e.persisted) {
                el.classList.remove('is-loading');
                el.removeAttribute('aria-disabled');
                el.style.pointerEvents = '';
                el.innerHTML = originalHTML;
              }
            }, { once: true });
          });
        });
    }
  };

  //Make profession category not selectable in webform.
  Drupal.behaviors.professionSelect = {
    attach: function (context) {

      $(once('professionSelect', '#edit-profession', context)).each(function () {

        const select = this;

        select.querySelectorAll('option').forEach(function (option) {

          // Skip already processed options
          if (option.dataset.processed) return;

          if (option.value !== '' && option.text.indexOf('\u3000 •') !== 0) {
            option.disabled = true;

            // Mark as processed
            option.dataset.processed = true;
          }

        });

      });

    }
  };










})(Drupal, jQuery, window.once);


