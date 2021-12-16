import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript('assets/js/script.js')
    setTimeout(() => {
      $("#addons-options-modal").modal('show');
    }, 10000);
  }

}
