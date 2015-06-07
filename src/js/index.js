(function() {

//master function to listen and parse all inputs
  $('.user-form').on('submit', function parseInputs(e){
    e.preventDefault();  
    var lowerCaseInput = $('.user-input').val().toLowerCase();
    var input = lowerCaseInput.split(': ');
    
    console.log(input);
  //    var input = [];
  //    for (var i = 0; i < inputAll.length; i++) {
  //      console.log(inputAll[i].val());
  //      inputAll[i].value.trim().push(input);
  //
  //    }
    if (1 == 1) {
          var ul = document.querySelector('.output-list');
          var li = document.createElement("li");
          var OriginalInput = $('.user-input').val();
            li.setAttribute('class','list-user');
            ul.appendChild(li);
            $('.list-user').last().text(OriginalInput);
            scroll();
     } 
    	if (input[0] == "gh") {
        getGitHub();
      }
        if (input[0] == "weather"){
          getWeather();
        }
          if (input[0] == 'gif'){
            getGif();
          }
            if (input[0] == 'help'){
              getHelp();
            }
              if (input[0] == 'calc'){
                getCalc();
              }
          $('.user-input').val('');
  });

//function to append new content to the Ul
function show(template, model) {
    var fn = _.template($('#' + template).html(), { variable: 'm' });
    console.log(model);
    console.log(fn);
    $('.output-list').append(fn(model));
        setTimeout(scroll,400);

  } 
//function to scroll viewport to bottom
  function scroll (){
    var objScroll = document.querySelector('.output-list');
    var targetOffset = objScroll.offsetHeight;
      console.log(targetOffset);
      objScroll.scrollTop = objScroll.scrollHeight + targetOffset;
//      $("html, body").animate({ scrollTop: 0 }, 600);
//    return false;
  };

//GitHub

  function getGitHub (){
    var input = $('.user-input').val().split(':');
    var ghLogin = input[1];
    console.log(ghLogin);
      $.getJSON('https://api.github.com/users/' + ghLogin)
        .done(showUser)
        .fail(showError);
  }
  
  function showUser(user) {
    show('gh-user-template', user);
    $('.user-input').val(''); 
  }
  
  function showError(req, status, err) {
    err = err || {};
    err.message = err.message || status;
    console.log(err);
    show('gh-error-template', { message: err });
  }

//Weather

  function getWeather() {
    var input = $('.user-input').val().split(': ');
    var location = input[1].trim(); 
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + location + ',us&units=imperial')
      .done(showWeather);
      console.log($.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + location + ',us&units=imperial'));
  }
  
  function showWeather(location) {
    show('weather-template', location);
    $('.user-input').val(''); 
  }

//Gif Api
  function getGif() {
    var input = $('.user-input').val().split(': ');
    var searchKeyword = input[1]; 
    $.getJSON('http://api.giphy.com/v1/gifs/search?q=' + searchKeyword + '&api_key=dc6zaTOxFJmzC')
      .done(showGif);
  }
  
  function showGif(image) {
    show('gify-template', image);
    $('.user-input').val(''); 
  }

//Help
  function getHelp(nothing){
    show('help-template', nothing);
  }

//Calculator
  function getCalc(){
    console.log($('.user-input').val());
    var userInput = $('.user-input').val().split(": "); // get the math part of the input
    var calcAnswer = eval(userInput[1]);  
    console.log(calcAnswer);
    show('calc-template', { result: calcAnswer});
  }
  
})();