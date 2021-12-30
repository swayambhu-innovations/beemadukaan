import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthencationService } from 'src/app/services/authencation.service';

declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dataProvider: DataProvider, public router: Router,public authService: AuthencationService) { }

  ngOnInit(): void {

      //Update Header Style and Scroll to Top
  function headerStyle() {
    if ($(".main-header").length) {
      var windowpos = $(window).scrollTop();
      var siteHeader = $(".main-header");
      var scrollLink = $(".scroll-to-top");

      var HeaderHight = $(".main-header").height();
      if (windowpos >= HeaderHight) {
        siteHeader.addClass("fixed-header");
        scrollLink.fadeIn(300);
      } else {
        siteHeader.removeClass("fixed-header");
        scrollLink.fadeOut(300);
      }
    }
  }

  headerStyle();

  //Submenu Dropdown Toggle
  if ($(".main-header li.dropdown ul").length) {
    $(".main-header li.dropdown").append(
      '<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>'
    );

    //Dropdown Button
    $(".main-header li.dropdown .dropdown-btn").on("click",  () => {
      $(this).prev("ul").slideToggle(500);
    });

    //Dropdown Menu / Fullscreen Nav
    $(".fullscreen-menu .navigation li.dropdown > a").on("click",  () => {
      $(this).next("ul").slideToggle(500);
    });

    //Disable dropdown parent link
    $(".navigation li.dropdown > a").on("click", (e : any) => {
        e.preventDefault();
      });

    //Disable dropdown parent link
    $(
      ".main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a"
    ).on("click", (e : any) => {
        e.preventDefault();
      });
  }

  //Mobile Nav Hide Show
  if ($(".mobile-menu").length) {
    $(".mobile-menu .menu-box").mCustomScrollbar();

    var mobileMenuContent = $(".main-header .nav-outer .main-menu").html();
    // $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);
    // $(".sticky-header .main-menu").append(mobileMenuContent);

    //Dropdown Button
    $(".mobile-menu li.dropdown .dropdown-btn").on("click",  () => {
      $(this).toggleClass("open");
      $(this).prev("ul").slideToggle(500);
    });

    //Dropdown Button
    $(".mobile-menu li.dropdown .dropdown-btn").on("click",  () => {
      $(this).toggleClass("open");
      $(this).prev(".mega-menu").slideToggle(500);
    });

    //Menu Toggle Btn
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
  }

}
