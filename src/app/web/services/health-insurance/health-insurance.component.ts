import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-health-insurance',
  templateUrl: './health-insurance.component.html',
  styleUrls: ['./health-insurance.component.css']
})
export class HealthInsuranceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript('assets/js/accordion.js');
  }

}
