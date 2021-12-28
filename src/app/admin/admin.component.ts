import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { menuItem } from '../structures/method.structure';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  serverStatus:'development' | 'stopped' | 'error' | 'running' | 'unknown' = 'running';
  serverStatusColor:'green'|'red'|'yellow'|'blue' = 'green';
  ngOnInit(): void {
    // this.getServerStatus();
    // setInterval(()  => this.getServerStatus(),10000)
  }
  constructor(public dataBase: DatabaseService){}
  async getServerStatus(){
    console.log('getting status');
    this.serverStatus = 'unknown';
    if ((await this.dataBase.getServerStatus()).exists()!){
      this.dataBase.setServerStatus().then(()=>{
        this.serverStatus = 'running';
      });
    }
    this.dataBase.getServerStatus().then((data) => {
      console.log("Got status")
      console.log(data.data()!.status);
    })
  }
  menuItems:menuItem[] = [
    {
      name: 'Dashboard', 
      route: 'home', 
      icon: 'home',
      outlet:''
    },

  ]
}
