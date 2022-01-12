import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  emailSubscription : any;
  errorMsg : string;
  submitted : boolean = false;
  constructor(public dataService : DatabaseService) { }

  ngOnInit(): void {
  }
  checkEmail(){
    if(this.emailSubscription == '' || this.emailSubscription === undefined){
      this.errorMsg = 'Please Enter Email Address to subscribe!'
    }else if(this.emailSubscription && this.submitted === true){
      this.errorMsg = ''
      console.log(this.emailSubscription)
      let data : any = {
        email : this.emailSubscription
      }
      this.dataService.addEmailSubscriptionById(data).then(
        (res) => {
          console.log(res);
          this.emailSubscription = '';
          this.errorMsg = "Subscribed to Email Successfully."
        }
      );
    }

  }

}
