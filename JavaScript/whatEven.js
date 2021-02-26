$(function() {
  $(".modal-link").click(function() {
    var s = $(this).attr("rel"); - 1 != s.indexOf("http") ? -1 != s.indexOf("website.com") ? window.location.href = s : window.open(s, "_blank") : ($("body").addClass("modal-open"), $(".modal-background").attr("rel", s), $(".modal-background").fadeIn(500), $(s).fadeIn(1e3))
  }), $(".modal-background").click(function() {
    var s = $(this).attr("rel");
    $(s).fadeOut(1e3), $("body").removeClass("modal-open"), $(".modal-background").fadeOut(500)
  })
}),
