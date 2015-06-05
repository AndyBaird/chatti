(function() {

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
          scroll();
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
  }
  
function showUser(user) {
  show('gh-user-template', user);
  }
  
function showError(req, status, err) {
  err = err || {};
  err.message = err.message || status;
  console.log(err);
  show('gh-error-template', { message: err });
  }
//function to append new content to the Ul
function show(template, model) {
    var fn = _.template($('#' + template).html(), { variable: 'm' });
    $('.output-list').append(fn(model));
    scroll();
  } 
//function to scroll viewport to bottom
  function scroll (){
    var objScroll = document.querySelector('.output-list');
    var targetOffset = objScroll.offsetHeight;
      console.log(targetOffset);
      objScroll.scrollTop = objScroll.scrollHeight + targetOffset;
  };

//function getWeather(zipCode) {
//  $.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=imperial')
//    .done(function (data) {
//      console.log(data);
//    	$('.active-title').html("Current Weather");
//    	$('.active-content').html("In " + data.name + " it is " + data.main.temp + " degrees outside and the conditions are: "
//      + data.weather[0].description);
//  });
//}  
  
  
})();
