import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-renewal',
  templateUrl: './insurance-renewal.component.html',
  styleUrls: ['./insurance-renewal.component.css']
})
export class InsuranceRenewalComponent implements OnInit {
  showData : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
