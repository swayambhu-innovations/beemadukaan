import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthencationService } from 'src/app/services/authencation.service';

declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedInUser : boolean = false;
  constructor(public authService : AuthencationService,public dataProvider:DataProvider) {
    this.checkAuthentication();
   }

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
    $.getScript('assets/js/header.js');
    headerStyle();
  }

  checkAuthentication(){
    this.authService.checkAuth().subscribe(
      (res) => {
        //console.log("res",res)
        this.isLoggedInUser = res.isLoggedIn;
      }
    );
  }
}
