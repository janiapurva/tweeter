/* eslint-disable func-style */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Implementing dynamic tweet structure


const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1611597538286
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1611683938286
  }
];


$(function() {

  function createTweetElement(tweetObj) {
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
            <p class = "tweet-info">${tweetObj.content.text}</p>
            <hr class="line-two">
          </div>
          <footer>
            <div class="time-ago">
              <p> ${tweetObj.created_at} </p>
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
    for (const tweetObj of tweetData) {
      
      const newElement = createTweetElement(tweetObj);

      // calls createTweetElement for each tweet
      $('#tweet').append(newElement);
    }
  };

  renderTweets(tweetData);

  
  
  function  ajaxRequest() {
    // setting event handler to submit request
    $("form").on('submit', function(event) {
      event.preventDefault();
      const formContent = $(this).serialize();
      
      //making AJAX request
      $.ajax({
        url : '/tweets',
        method : "POST",
        data: formContent
      })
        .done(function(result) {
          console.log(result);
        })
        .fail(() =>
          console.log("Bad request"))
        .always(() => {
          console.log('completed');
        });

    });
  }
  ajaxRequest();

});


