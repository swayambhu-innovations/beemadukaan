import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {
  uploadForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    file: new FormControl([Validators.required]),
  });
  files:any=[];
  constructor(private databaseService: DatabaseService,private dataProvider:DataProvider) { }
  fileEvent:any;
  uploadFile(event:any) {
    this.dataProvider.pageSetting.blur = true;
    if (event){
      if (event.target.files.length > 0 && (event.target.files[0].name.slice((event.target.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2) === 'pdf')) {
        this.databaseService.upload('downloads/'+event.target.files[0].name,event.target.files[0]).then((data)=>{
          if (data!=false){
            this.databaseService.addDownloadableFile(data,this.uploadForm.value.title,'downloads/'+event.target.files[0].name).then((val)=>{
              console.log(val);
              this.dataProvider.pageSetting.blur = false;
              this.getDownloads();
              alert('File Uploaded');
            })
          } else {
            console.log('Error occured while uploading file',data)
            this.dataProvider.pageSetting.blur = false;
          }
        });
      } else {
        alert("Wrong file only accepts pdf files")
        this.dataProvider.pageSetting.blur = false;
      }
    } else {
      alert("Please select a file")
      this.dataProvider.pageSetting.blur = false;
    }
  }
  getDownloads(){
    this.files = [];
    this.databaseService.getDownloadableFile().then((data)=>{
      console.log(data);
      data.forEach(element => {
        var filteredData = element.data()
        filteredData.id = element.id
        this.files.push(filteredData)
      })
      console.log(this.files);
    });
  }
  deleteItem(id:string,path:string){
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.deleteFile(id,path).then((data)=>{
      // console.log(data);
      this.getDownloads();
      this.dataProvider.pageSetting.blur = false;
    })
  }
  ngOnInit(): void {
    this.databaseService.getDownloadableFile().then((data)=>{
      console.log(data);
      data.forEach(element => {
        var filteredData = element.data()
        filteredData.id = element.id
        this.files.push(filteredData)
      })
      console.log(this.files);
    });
  }

}
