(function ($) {
  "use strict";

  // //Submenu Dropdown Toggle
  if ($(".main-header li.dropdown ul").length) {
    $(".main-header li.dropdown").append(
      '<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>'
    );

    //Dropdown Button
    $(".main-header li.dropdown .dropdown-btn").on("click", function () {
      $(this).prev("ul").slideToggle(500);
    });

    //Dropdown Menu / Fullscreen Nav
    $(".fullscreen-menu .navigation li.dropdown > a").on("click", function () {
      $(this).next("ul").slideToggle(500);
    });

  //   //Disable dropdown parent link
    $(".navigation li.dropdown > a").on("click", function (e) {
      e.preventDefault();
    });

    //Disable dropdown parent link
    $(
      ".main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a"
    ).on("click", function (e) {
      e.preventDefault();
    });
  }

  // //Mobile Nav Hide Show
  if ($(".mobile-menu").length) {
    $(".mobile-menu .menu-box").mCustomScrollbar();

    var mobileMenuContent = $(".main-header .nav-outer .main-menu").html();
    // $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);
    // $(".sticky-header .main-menu").append(mobileMenuContent);

    //Dropdown Button
    $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
      console.log("clicked")
      $(this).toggleClass("open");
      $(this).prev("ul").slideToggle(500);
      console.log("clicked ended")
    });

  //   //Menu Toggle Btn
    $(".mobile-nav-toggler").on("click", function () {
      $("body").addClass("mobile-menu-visible");
    });

    //Menu Toggle Btn
    $(".mobile-menu .menu-backdrop,.mobile-menu .close-btn").on(
      "click",
      function () {
        $("body").removeClass("mobile-menu-visible");
      }
    );
  }
  //Mobile Nav Hide Show

})(window.jQuery);
