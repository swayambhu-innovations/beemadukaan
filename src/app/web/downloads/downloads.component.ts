import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  constructor(private databaseService : DatabaseService) { }
  downloads: any = [];
  ngOnInit(): void {
    this.databaseService.getDownloadableFile().then((data)=>{
      data.forEach(element => {
        var filteredData = element.data()
        filteredData.id = element.id
        this.downloads.push(filteredData)
      })
    })
  }

}
