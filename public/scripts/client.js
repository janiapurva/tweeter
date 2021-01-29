/* eslint-disable func-style */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Implementing dynamic tweet structure

$(function() {



  function timeSince(date) {

    //date generator function
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }


  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  function createTweetElement(tweetObj) {
    const result = timeSince(tweetObj.created_at);
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
              <p> ${result}</p>
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

  // Inserting tweet element
  const renderTweets = function(tweetData) {
  // loops through tweets
    $('#tweet').html('');
    
    for (const tweetObj of tweetData) {
      const newElement = createTweetElement(tweetObj);
      // calls createTweetElement for each tweet
      $('#tweet-insert').prepend(newElement);
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
      //please dont't remove this console log its breaking code
        console.log("Bad request")
      )
      .always(() =>
      //please dont't remove this console log its breaking code

        console.log('completed')
      );
  }
  
  // writing tweet an adding to database
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
          //please dont't remove this console log its breaking code

          console.log(result);
          input.val('');
          $('.counter').val(140);
          loadTweets();
        })
        .fail(() =>
        //please dont't remove this console log its breaking code

          console.log("Bad request"))
        .always(() =>
        //please dont't remove this console log its breaking code

          console.log("completed")
        );
    });
    
  }
  addTweetRequest();
  loadTweets();

});


$(document).ready(function() {
  
  let btn = $('#top-button');

  

  $(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '50');
  });

});



