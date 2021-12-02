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
})(window.jQuery);
