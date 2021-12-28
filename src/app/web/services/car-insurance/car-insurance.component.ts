import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-car-insurance',
  templateUrl: './car-insurance.component.html',
  styleUrls: ['./car-insurance.component.css']
})
export class CarInsuranceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript('assets/js/accordion.js');
  }

}
