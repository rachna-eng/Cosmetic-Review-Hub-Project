(function ($) {
  const a = $("#btn-whishlist");
  a.on("click", function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: this.href,
      data: {},
      success: function (data) {
        alert("Added to wishlist");
      },
      error: function (xhr, textStatus, error) {
        alert("To save your product to wishlist, Login first");
        window.location.href = "/login";
      },
    });
  });

//   const form = $("#addlike");
//   form.submit(function (event) {
//     // let like = $("#like");
//     //    event.preventDefault();
//   });
 })(window.jQuery);
