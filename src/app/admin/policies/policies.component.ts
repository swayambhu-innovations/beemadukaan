import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { PolicyData } from 'src/app/structures/method.structure';
declare var $: any;
@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  policyDataList:any = [];
  policyFile:File;
  policyFileUrl:string;
  gotData:boolean = false;
  policyPaid:boolean = false;
  currentData:PolicyData;
  constructor(private databaseService : DatabaseService,private dataProvider : DataProvider) { }
  uploadDataForm = new FormGroup({
    nameOfInsured: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    policyNumber: new FormControl('', [Validators.required]),
    registrationNo: new FormControl('', [Validators.required]),
    premium: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    totalPremiuim: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
  this.policyDataList = [];
  this.databaseService.getAllPolicy().then((res:any) => {
    res.forEach((element:any) => {
      this.policyDataList.push(element.data());
    })
  }).finally(()=>{
    this.gotData = true;
  })
  }
  setAsAlreadyPaid(data:any){
    if (confirm('Are you sure to set policy '+data.registrationNo+' as already paid ?')){
      this.databaseService.setPolicyAsAlreadyPaid(data.id).then((data:any)=>{
        alert('Successfully set as already paid');
        this.ngOnInit();
      })
    }
  }
  setModalData(data:any){
    this.currentData = data;
    this.uploadDataForm.patchValue({
      nameOfInsured: data.name,
      email: data.email,
      policyNumber: data.policyNumber,
      registrationNo: data.registrationNo,
      premium: data.toBePaidPremium,
      mobileNumber: data.mobileNumber,
      totalPremiuim: data.totalPremium,
      startDate: data.startDate,
    });
    this.policyFileUrl = data.policyURl;
    $('#myModal').modal('show');
  }
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
  deletePolicy(data:any){
    if (confirm('Are you sure to delete policy '+data.registrationNo+' ?')){
      this.databaseService.deletePolicy(data.id).then((data:any)=>{
        alert('Successfully deleted');
        this.ngOnInit();
      })
    }
  }
  uploadPolicyData() {
    if (this.uploadDataForm.valid) {
      let expiryDate = new Date(this.uploadDataForm.value.startDate).setDate(
        new Date(this.uploadDataForm.value.startDate).getDate() + 365
      );
      let lastMonth = new Date(expiryDate).setDate(
        new Date(expiryDate).getDate() + 335
      );
      if (this.policyFile){
        this.databaseService.upload('policies/'+this.uploadDataForm.value.registrationNo+'.'+(this.policyFile.name.split('.').pop()),this.policyFile).then((url:any)=>{
          this.databaseService.updatePolicyData(this.currentData.id,
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
              paid:this.policyPaid,
              policyURl:url,
              id:'',
            }
          ).then((data: any) => {
            this.uploadDataForm.reset();
            this.dataProvider.pageSetting.blur = false;
            alert('Successfully uploaded data');
            $('#myModal').modal('hide');
          });
        })
      } else if(this.policyFileUrl != '' && this.policyFileUrl != undefined) {
        this.databaseService.updatePolicyData(this.currentData.id,
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
            paid:this.policyPaid,
            policyURl:this.policyFileUrl,
            id:'',
          }
        ).then((data: any) => {
          this.uploadDataForm.reset();
          this.dataProvider.pageSetting.blur = false;
          alert('Successfully uploaded data');
          $('#myModal').modal('hide');
        });
      } else {
        alert('No file provided or available please upload it you cannot continue without it.');
      }
    }
  }
  uploadSingleData() {
    console.log(this.uploadDataForm.value);
    if (this.uploadDataForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      this.uploadPolicyData();
    } else {
      alert('Please provide all the values.');
    }
  }
  isString(data:any){
    if (typeof data == 'string'){
      return true;
    } else {
      return false;
    }
  }

}
