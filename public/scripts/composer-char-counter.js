// Implemnted charcater count function


$(function() {
  
  $('#tweet-text').keydown(function () {
    let remaining = 140 - $(this).val().length;
    $(".counter").text(remaining);
    if (remaining < 0) {
      $("form").find("output").addClass("minus-char");
    } else {
      $("form").find("output").removeClass("minus-char");
    }
  });

  $('#tweet-text').keyup(function () {
    let remaining = 140 - $(this).val().length;
    $(".counter").text(remaining);
    if (remaining < 0) {
      $("form").find("output").addClass("minus-char");
    } else {
      $("form").find("output").removeClass("minus-char");
    }
  });

  $('#tweet-text').change(function () {
    let remaining = 140 - $(this).val().length;
    $(".counter").text(remaining);
    if (remaining < 0) {
      $("form").find("output").addClass("minus-char");
    } else {
      $("form").find("output").removeClass("minus-char");
    }
  });


  $('#tweet-text').mousedown(function () {
    let remaining = 140 - $(this).val().length;
    $(".counter").text(remaining);
    if (remaining < 0) {
      $("form").find("output").addClass("minus-char");
    } else {
      $("form").find("output").removeClass("minus-char");
    }
  });

  $('#tweet-text').mouseout(function () {
    let remaining = 140 - $(this).val().length;
    $(".counter").text(remaining);
    if (remaining < 0) {
      $("form").find("output").addClass("minus-char");
    } else {
      $("form").find("output").removeClass("minus-char");
    }
  });


  $('#tweet-text').mouseleave(function() {
    let remaining = 140 - $(this).val().length;
    $(".counter").text(remaining);
    if (remaining < 0) {
      $("form").find("output").addClass("minus-char");
    } else {
      $("form").find("output").removeClass("minus-char");
    }
  });

});


