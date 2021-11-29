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
        alert("Failed to add to wishlist");
      },
    });
  });
})(window.jQuery);
