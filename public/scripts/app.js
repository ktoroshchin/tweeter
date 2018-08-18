// jshint esversion: 6
 // * Client-side JS logic goes here
 // * jQuery is already loaded
 // * Reminder: Use (and do all your DOM work in) jQuery's document ready function



/*Takes in a tweet object and is responsible for
returning a tweet <article> element containing the
entire HTML structure of the tweet.*/

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

  $('document').ready(function() {

      /*jquery to show the compose field and make
      it on focus(no need to click on a text field)*/
      $('.compose-button').on('click', function(event){
          $("#new-tweet").slideToggle();
          $("#tweet-box").focus();
      });

    function createTweetElement(tweet) {
      let $tweet = $('<article>').addClass("posted-tweet");
      var $header = $("<header>").addClass("posted-tweet-header");
      var $avatar = $("<img>").addClass("profile-img").attr("src", tweet.user.avatars.small);
      var $user_name = $("<h2>").addClass("nickname").text(tweet.name);
      var $tag_name = $("<span>").addClass("tag_name").text(tweet.user.handle);


      var $paragraph = $("<p>").addClass("post-text").text(tweet.content.text);

      var $footer = $("<footer>").addClass("footer-footer");
      var $timeAgo = $("<p>").addClass("time-ago").text(timeSince(tweet.created_at));
      var $icons = $("<span>").addClass("icons");
      var $heartIcon = $("<i>").addClass("fas").addClass("fa-heart");
      var $recycleIcon = $("<i>").addClass("fas").addClass("fa-recycle");
      var $flagIcon = $("<i>").addClass("fas").addClass("fa-flag");

      $header.append($avatar,$user_name,$tag_name);
      $footer.append($timeAgo,$icons);
      $tweet.append($header,$paragraph,$footer);
      $icons.append($heartIcon,$recycleIcon,$flagIcon);
      return $tweet;
    }

    /*Run function(script) after body(page) is loaded otherwise you wont see updates,
    script runs and body loades after and you dont see changes*/

    /*by clicking button we prevent from RE-DIRECTION with
    preventDefault*/
      // $(function sendDataToServer() {
      // var $button = $("#tweetButton");
      $("form").on("submit", function(event) {
        event.preventDefault();
        console.log('Button clicked, performing ajax call...');
        $("ul.errors").empty()

        var current_tweet = $(this).children("textarea").val()
        if (current_tweet.length == 0 ) {
          /*if message is too short display error*/
            $("<li>").css("color", "red").text("Your Message Is Too Short").appendTo($("ul.errors"))
        }
          /*if message is too long display error*/
          if (current_tweet.length > 140) {
            $('#tweetButton').on("submit").after("<p color:red>Your Message Is Too Long</p>")
            $("<li>").css("color", "red").text("Your Message Is Too Long").appendTo($("ul.errors"))
        }
        /*we direct our post request to the server with a post method
        and usind serialize() pulling it of input field and convert into string*/
        /* do the request and only when it comes back then do below*/
        $.ajax('/tweets', { method: 'POST' , data: $(this).serialize() }).then(function (response) {
          console.log('Success: ', response);
          $(".posted-tweet-container").prepend(createTweetElement(response.tweet))
        });
      });



    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
      function renderTweets(tweet) {
        for( var i = 0; i < tweet.length; i++){
          $(".posted-tweet-container").append(createTweetElement(tweet[i]))
        }
      }

      function loadTweets(){
        $.ajax('/tweets', { method: 'GET'})
        .then(function (tweets) {
          console.log('Post that tweet... ', tweets);
          renderTweets(tweets);
          })
        }
      loadTweets();
      });

  function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

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
var aDay = 24*60*60*1000
console.log(timeSince(new Date(Date.now()-aDay)));
console.log(timeSince(new Date(Date.now()-aDay*2)));
