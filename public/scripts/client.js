/* eslint-disable func-style */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Implementing dynamic tweet structure

$(function() {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  function createTweetElement(tweetObj) {
    const date = new Date(tweetObj.created_at);
    const day = (Date.now() - date) / 1000 / 60 / 60 / 24;
    const result = Math.floor(day);
    const safeText = escape(tweetObj.content.text);
    const article = `
  <article id ="tweet">
          <header>
            <div class = "image-name">
            <img class = "profile-img" src=${tweetObj.user.avatars} alt="avatars" >
            <span class = "profile-name">${tweetObj.user.name}</span>
            </div>
            <div class = "username">
            <span >${tweetObj.user.handle}</span>
            </div>
          </header>
          <div class="tweeet-content">
            <p class = "tweet-info">${safeText}</p>
            <hr class="line-two">
          </div>
          <footer>
            <div class="time-ago">
              <p> ${result} Days ago </p>
            </div>
            <div class = "icons">
              <i style="font-size:24px" class="fa">&#xf11d;</i>
              <i style="font-size:24px" class="fa">&#xf004;</i>
              <i style="font-size:24px" class="fa">&#xf079;</i>
              </div>

          </footer>
        </article>`;
    return article;
  }


  const renderTweets = function(tweetData) {
  // loops through tweets
    $('#tweet').html('');
    let refineData = tweetData.reverse();
    for (const tweetObj of refineData) {
      
      const newElement = createTweetElement(tweetObj);

      // calls createTweetElement for each tweet
      $('#tweet-insert').append(newElement);
    }
  };

  



  //fetching tweets function
  function loadTweets() {


    $.ajax({
      url : 'http://localhost:8080/tweets',
      method: 'GET'
    
    })
      .done(function(result) {
        renderTweets(result);
      })
      .fail(() =>
        console.log("Bad request"))
      .always(() => {
        console.log('completed');
      });

  }
  





  
  
  function  addTweetRequest() {
    // setting event handler to submit request
    $("form").on('submit', function(event) {
      event.preventDefault();
      const input = $("textarea");
      // checking tweet validation
      if (input.val().length > 140) {
        
        $(".submit-tweet").prepend($("<span>").addClass("tweet-error").text("Please keep character below 140").fadeIn(300).fadeOut(5500));
        return;
      }
      if (input.val() === "") {
        $(".submit-tweet").prepend($("<span>").addClass("tweet-error").text("We are sorry We didn't get that").fadeIn(300).fadeOut(5500));
        return;
      }

      if (input.val() === null) {
        $(".submit-tweet").prepend($("<span>").addClass("tweet-error").text("Please fill tweet area").fadeIn(300).fadeOut(5500));
      }
      // main function implemntion

      const formContent = $(this).serialize();

      
      
      
      
      //making AJAX request
      $.ajax({
        url : '/tweets',
        method : "POST",
        data: formContent
      })
        .done(function(result) {
          console.log(result);
          input.val('');
          $('.counter').val(140);
          loadTweets();
        })
          
          
        .fail(() =>
          console.log("Bad request"))
        .always(() => {
          console.log('completed');
        });

    });
    
  }
  addTweetRequest();
  loadTweets();

});


