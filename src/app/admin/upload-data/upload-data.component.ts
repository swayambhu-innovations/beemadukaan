import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { PolicyData } from 'src/app/structures/method.structure';
import * as XLSX from 'xlsx';
declare var $:any;
@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css'],
})
export class UploadDataComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  datalist: any;
  constructor(private dataProvider: DataProvider,private databaseService : DatabaseService) {}
  headerList:any=[]
  importantFields:string[] = ['Serial','Name Of Insured','Email','Mobile Number','Registration No.','IDV Value','Policy Number','Business Type','Policy Effective Date','OD Premium','TP Premium','Net Premium in Portal','Service Tax/GST in Portal','Total Premium in Portal']
  incorrectFields:any = []
  filteredData: PolicyData[] = [];
  disableForm:boolean = false;
  ngOnInit(): void {}
  getDataFromfile(event:any){
    this.dataProvider.pageSetting.blur = true;
    this.addfile(event)
  }
  verifyDetails(){
    this.dataProvider.pageSetting.blur = true;
    this.disableForm = true;
    let valid=true;
    this.datalist.forEach((element:any)=>{
      this.importantFields.forEach((key:any)=>{
        if (key in element){
          if (element[key] != null && element[key] != undefined && element[key] != ''){
            return true
          }else{
            this.incorrectFields.push({error:'No data in serial number '+this.datalist.indexOf(element)+ ' at field name '+ key})
            return false
          }
        } else {
          this.incorrectFields.push({error:'Wrong field name in serial number '+this.datalist.indexOf(element)+ ' at field name '+ key})
          return false
        }
      })
    })
    if (this.incorrectFields.length > 0) {
      this.dataProvider.pageSetting.blur = false;
      $('#exampleModalCenter').modal('show')
      this.disableForm = false;
    } else {
      this.uploadData()
    }
  }
  uploadData(){
    this.datalist.forEach((element:any)=>{
      this.filteredData.push({
        serial:element['Serial'],
        name: element['Name Of Insured'],
        email:element['Email'],
        mobileNumber:element['Mobile Number'],
        registrationNo:element['Registration No.'],
        idvValue:element['IDV Value'],
        policyNumber:element['Policy Number'],
        businessType:element['Business Type'],
        policyEffectiveDate:element['Policy Effective Date'],
        odPremiuim:element['OD Premium'],
        tpPremiuim:element['TP Premium'],
        netPremuim:element['Net Premium in Portal'],
        serviceTax:element['Service Tax/GST in Portal'],
        totalPremiumInPortal:element['Total Premium in Portal'],
      })
    })
    if (confirm('Are you sure you want to upload this data to live database.')){
      this.databaseService.addChainedPolicyData(this.filteredData).then((data:any)=>{
        this.dataProvider.pageSetting.blur = false;
        console.log('Successfully uploaded data')
      })
    }
  }
  addfile(event: any) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.datalist = XLSX.utils.sheet_to_json(worksheet, { raw: true }).filter((data:any)=>{
        return /^\d+$/.test(data['Serial'])
      })
      // this.datalist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      if (this.datalist.length > 0){
        this.headerList=Object.keys(this.datalist[0])
      } else {
        alert("No data found in file")
      }
      this.dataProvider.pageSetting.blur = false;
    };
  }
}
