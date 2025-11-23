

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
