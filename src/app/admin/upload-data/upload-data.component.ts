import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { PolicyData } from 'src/app/structures/method.structure';
import * as XLSX from 'xlsx';
declare var $: any;
@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css'],
})
export class UploadDataComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  datalist: any;
  showBulkUpload: boolean = false;
  policyFile:File;
  constructor(
    private dataProvider: DataProvider,
    private databaseService: DatabaseService
  ) {}
  headerList: any = [];
  importantFields: string[] = [
    'Serial',
    'Name Of Insured',
    'Email',
    'Mobile Number',
    'Registration No.',
    'Policy Number',
    'Start Date (MM/DD/YYYY)',
    'Premium To Paid',
    'Total Premium'
  ];
  incorrectFields: any = [];
  filteredData: PolicyData[] = [];
  disableForm: boolean = false;
  ngOnInit(): void {}
  getDataFromfile(event: any) {
    this.dataProvider.pageSetting.blur = true;
    this.addfile(event);
  }
  verifyDetails() {
    this.dataProvider.pageSetting.blur = true;
    this.disableForm = true;
    let valid = true;
    this.datalist.forEach((element: any) => {
      this.importantFields.forEach((key: any) => {
        if (key in element) {
          if (
            element[key] != null &&
            element[key] != undefined &&
            element[key] != ''
          ) {
            return true;
          } else {
            this.incorrectFields.push({
              error:
                'No data in serial number ' +
                this.datalist.indexOf(element) +
                ' at field name ' +
                key,
            });
            return false;
          }
        } else {
          this.incorrectFields.push({
            error:
              'Wrong field name in serial number ' +
              this.datalist.indexOf(element) +
              ' at field name ' +
              key,
          });
          return false;
        }
      });
    });
    if (this.incorrectFields.length > 0) {
      this.dataProvider.pageSetting.blur = false;
      $('#exampleModalCenter').modal('show');
      this.disableForm = false;
    } else {
      this.uploadData();
    }
  }
  uploadData() {
    this.datalist.forEach((element: any) => {
      const startDate = new Date(element['Start Date (MM/DD/YYYY)'])
      let expiryDate = new Date(this.uploadDataForm.value.startDate).setDate(
        new Date(this.uploadDataForm.value.startDate).getDate() + 365
      );
      let lastMonth = new Date(this.uploadDataForm.value.startDate).setDate(
        new Date(this.uploadDataForm.value.startDate).getDate() + 335
      );
      this.filteredData.push({
        name: element['Name Of Insured'],
        email: element['Email'],
        mobileNumber: element['Mobile Number'],
        registrationNo: element['Registration No.'],
        policyNumber: element['Policy Number'],
        startDate: element['Start Date (MM/DD/YYYY)'],
        toBePaidPremium: element['Premium To Paid'],
        lastMonth: lastMonth,
        expiryDate: expiryDate,
        totalPremium: element['Total Premium'],
        paid:false,
        policyURl:'',
        id:''
      });
    });
    if (
      confirm('Are you sure you want to upload this data to live database.')
    ) {
      this.databaseService
        .addChainedPolicyData(this.filteredData)
        .then((data: any) => {
          this.dataProvider.pageSetting.blur = false;
          alert('Successfully uploaded data');
        });
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
      this.datalist = XLSX.utils
        .sheet_to_json(worksheet, { raw: true })
        .filter((data: any) => {
          return /^\d+$/.test(data['Serial']);
        });
      // this.datalist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      if (this.datalist.length > 0) {
        this.headerList = Object.keys(this.datalist[0]);
        console.log(this.headerList);
      } else {
        alert('No data found in file');
      }
      this.dataProvider.pageSetting.blur = false;
    };
  }
  uploadDataForm = new FormGroup({
    nameOfInsured: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    policyNumber: new FormControl('', [Validators.required]),
    registrationNo: new FormControl('', [Validators.required]),
    premium: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    totalPremiuim: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    fileData: new FormControl('', [Validators.required]),
  });
  setFile(event:any){
    if (event){
      if (event.target.files[0]){
        if (event.target.files[0].name.split('.').pop() == 'pdf'){
          this.policyFile = event.target.files[0];
        } else {
          alert('File provided is not valid pdf file.');
        }
      } else {
        alert('No files selected')
      }
    } else {
      alert('No files selected')
    }
  }
  uploadPolicyData() {
    if (this.uploadDataForm.valid && this.policyFile) {
      let expiryDate = new Date(this.uploadDataForm.value.startDate).setDate(
        new Date(this.uploadDataForm.value.startDate).getDate() + 365
      );
      let lastMonth = new Date(expiryDate).setDate(
        new Date(expiryDate).getDate() + 335
      );
      this.databaseService.upload('policies/'+this.uploadDataForm.value.registrationNo+'.'+(this.policyFile.name.split('.').pop()),this.policyFile).then((url:any)=>{
        this.databaseService.addPolicyData(
          {
            name: this.uploadDataForm.value.nameOfInsured,
            email: this.uploadDataForm.value.email,
            policyNumber: this.uploadDataForm.value.policyNumber,
            registrationNo: this.uploadDataForm.value.registrationNo,
            startDate: this.uploadDataForm.value.startDate,
            totalPremium: this.uploadDataForm.value.totalPremiuim,
            mobileNumber: this.uploadDataForm.value.mobileNumber,
            toBePaidPremium: this.uploadDataForm.value.premium,
            lastMonth: lastMonth,
            expiryDate: expiryDate,
            paid:false,
            policyURl:url,
            id:''
          }
        ).then((data: any) => {
          this.uploadDataForm.reset();
          this.dataProvider.pageSetting.blur = false;
          alert('Successfully uploaded data');
        });
      })
    }
  }
  uploadSingleData() {
    console.log(this.uploadDataForm.value);
    if (this.uploadDataForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.getAllPolicy().then((data: any) => {
        var valid = true;
        data.forEach((element: any) => {
          if (
            this.uploadDataForm.value.registrationNo ===
            element.data().registrationNo
          ) {
            valid = false;
          }
        });
        if (valid) {
          this.uploadPolicyData();
        } else {
          alert('A vehicle is already registered');
          this.dataProvider.pageSetting.blur = false;
        }
      });
    } else {
      alert('Please provide all the values.');
    }
  }
}
