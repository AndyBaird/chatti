(function() {
//function to display user input in output element


//master function to listen and parse all inputs
$('.user-form').on('submit', function parseInputs(e){
  e.preventDefault();
    var input = $('.user-input').val().split(': ');
    console.log(input[0]);
    	if (input[0] == "gh") {
        getGitHub();
      }else{
        var ul = document.querySelector('.output-list');
        var li = document.createElement("li");
        var input = $('.user-input').val();
          li.setAttribute('class','list-user');
          ul.appendChild(li);
          $('.list-user').last().text(input);
          $('.user-input').val(''); 
    };
});
//function to query GitHub
function getGitHub (){
  var input = $('.user-input').val().split(': ');
  var ghLogin = input[1];
  console.log(ghLogin);
    $.getJSON('https://api.github.com/users/' + ghLogin)
      .done(showUser)
      .fail(showError);
  };
  
  function showUser(user) {
    show('gh-user-template', user);
  }

  function show(template, model) {
    var fn = _.template($('#' + template).html(), { variable: 'm' });
    $('.output-list').html(fn(model));
  } 
  function showError(req, status, err) {
    err = err || {};
    err.message = err.message || status;
    console.log(err);
    show('gh-error-template', { message: err });
  }
})();

//need to have one central parsing function that listens for the input
//and calls other functions based on the listener @gh, @weather etc.