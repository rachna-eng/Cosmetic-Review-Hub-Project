// (function ($) {
//   let hasErrors = false;
//   function validString(str) {
//     if (!str || !isNaN(str)) {
//       hasErrors = true;
//       return false;
//     }
//     return true;
//   }

//   function validNumber(num) {
//     // Must be a whole integer between 1 and 5
//     if (
//       !num ||
//       isNaN(num) ||
//       num.includes(".") ||
//       parseInt(num) < 1 ||
//       parseInt(num) > 5
//     ) {
//       hasErrors = true;
//       return false;
//     }
//     return true;
//   }

//   let form = $("#review-form");
//   let ratingInput = $("#review-rating");
//   let reviewTitleInput = $("#review-title");
//   let reviewBodyInput = $("#review-body");
//   let btn = $("#submitButton");

//   form.submit((event) => {
//     // Client side validation
//     event.preventDefault();

//     btn.prop("disabled", true);
//     $(".error").hide();

//     hasErrors = false;
//     reviewTitleInput.removeClass("is-valid is-invalid");
//     reviewBodyInput.removeClass("is-valid is-invalid");
//     ratingInput.removeClass("is-valid is-invalid");

//     let info = {
//       title: reviewTitleInput.val().trim(),
//       reviewBody: reviewBodyInput.val().trim(),
//       rating: ratingInput.val().trim(),
//     };

//     if (!validString(info.title)) reviewTextInput.addClass("is-invalid");
//     if (!validString(info.reviewBody)) priceInput.addClass("is-invalid");
//     if (!validNumber(info.rating)) ratingInput.addClass("is-invalid");

//     if (!hasErrors) {
//       form.unbind().submit();
//     } else {
//       btn.prop("disabled", false);
//     }
//   });
// })(jQuery);

(function ($) {
  const form = $("#addreview");
  form.submit(function (event) {
    let ratingInput = $("#rating");
    let reviewTitleInput = $("#title");
    let reviewBodyInput = $("#reviewBody");
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: form.attr("action"),
      contentType: "application/json",
      data: JSON.stringify({
        title: reviewTitleInput.val().trim(),
        reviewBody: reviewBodyInput.val().trim(),
        rating: ratingInput.val().trim(),
      }),
      success: function (data) {
        alert("Review added Suceessfully");
        window.location.reload();
      },
      error: function (xhr, textStatus, error) {
        alert("Login to Add Review, FILL ALL DETAILS, Failed to Add");
        console.log(error)
      },
    });
  });
  //add comment for a review
  $(".comment-btn").click(function(e) {
    e.preventDefault();
    $(".comment-group").remove();
    $(this).parent().parent().parent().parent().find("div.card-header").after("\
    <div class='form-group comment-group'><label class='col-md-3 control-label' for='comment'>Your Comment</label>\
      <div class='col-md-9'>\
          <textarea class='form-control' name='commentBody' placeholder='Please enter your comment here...' rows='3'></textarea>\
      </div>\
      <div class='form-group'>\
          <div class='col-md-12 text-center'>\
            <button type='button' class='float-right btn btn-primary btn-md comment-submit'>Submit</button>\
          </div>\
      </div>\
    </div>");
  });
  // submit comment for a review 
  $(".card-body").on("click",".comment-submit",function(e) {
    e.preventDefault();
    let commentBody = $(this).parent().parent().parent().find("textarea.form-control").val();
    if(commentBody==""){
      alert("comment cant not be null")
      return;
    }
    $.ajax({
      type: "POST",
      //how to get reviewId!!!!
      url: "/reviews/comment/:reviewId",
      contentType: "application/json",
      data: JSON.stringify({
        commentBody: commentBody,
        reviewId: "",
      }),
      success: function (data) {
        alert("comment added Suceessfully");
        window.location.reload();
      },
      error: function (xhr, textStatus, error) {
        alert("Login to Add Review, FILL ALL DETAILS, Failed to Add");
        console.log(error)
      },
    });
  });

})(window.jQuery);
