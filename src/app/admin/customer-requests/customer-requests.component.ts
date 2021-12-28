import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-customer-requests',
  templateUrl: './customer-requests.component.html',
  styleUrls: ['./customer-requests.component.css']
})
export class CustomerRequestsComponent implements OnInit {
  mainData : any = [];
  constructor(private databaseService : DatabaseService) {
    this.getCustomerRequests();
  }

  ngOnInit(): void {
  }
  getCustomerRequests(){
    this.databaseService.getContactRequest().then(
      (res) => {
        console.log("data", res)
        res.forEach((item) => {
          console.log(item.data());
          this.mainData.push(item.data());
        })
      }
    );

  }
}
