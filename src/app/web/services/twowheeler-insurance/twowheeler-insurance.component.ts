import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-twowheeler-insurance',
  templateUrl: './twowheeler-insurance.component.html',
  styleUrls: ['./twowheeler-insurance.component.css']
})
export class TwowheelerInsuranceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript('assets/js/accordion.js');
  }

}
