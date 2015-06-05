(function() {

  $('.user-form').on('submit', function newLi(e){
    e.preventDefault();
      var ul = document.querySelector('.output-list');
      var li = document.createElement("li");
      var input = $('.user-input').val();
        li.setAttribute('class','list-user');
        ul.appendChild(li);
        $('.list-user').last().text(input);
        $('.user-input').val(''); 
  });

})();