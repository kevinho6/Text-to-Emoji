$(document).ready(function() {
  var $input = $('input[type=text]');
  var $submit = $('input[type=submit]');

  $input
    .on('keyup', function() {
      $submit.prop('disabled', true);
      if ($(this).val().length !== 0) {
        $submit.prop('disabled', false);
      }
    })
    .keyup();
});
