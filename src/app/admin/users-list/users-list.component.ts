import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  mainData : any = []
  constructor(private databaseService : DatabaseService) {
    this.getUserLists();
   }

  ngOnInit(): void {
  }
  getUserLists(){
    this.databaseService.getUserList().then(
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
