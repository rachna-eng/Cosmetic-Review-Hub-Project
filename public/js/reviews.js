

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
        alert("Login to Add review, fILL ALL DETAILS, Failed to Add");
      },
    });
  });
})(window.jQuery);
