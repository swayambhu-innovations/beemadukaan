import { Component, OnInit } from '@angular/core';

declare var $:any;
declare var jQuery :any;
declare var jquery : any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript('assets/js/script.js');
    setTimeout(() => {
      $("#addons-options-modal").modal('show');
    }, 5000);
  }


}
