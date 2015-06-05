(function() {

  $('.user-form').on('submit', function(e){
    e.preventDefault();
    var input = $('.user-input').val();
    $('.list-user').text(input); 
    $('.user-input').val(''); 
  });


})();