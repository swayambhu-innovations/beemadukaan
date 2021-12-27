import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonFunction } from 'src/app/common';
import { AuthencationService } from 'src/app/services/authencation.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm : FormGroup;
  validationMessages : any;
  formErrors : any = {
    email: '',
    password: '',
  };
  constructor(private fb : FormBuilder, private authService : AuthencationService) {
    this.signinForm = this.fb.group({
      email : [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(60)
        ]),
      ],
      password : [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(60)
        ])
      ]
    });
    this.validationMessages = {
      email : {
        required : `Please enter Email Address`,
        email : `Please check the Email Address`,
        maxLength : `Maximum 60 characters are allowed.`
      },
      password : {
        required : `Please Enter Password.`,
        maxLength : `Maximum 60 characters are allowed.`
      }
    }
   }

  ngOnInit(): void {
  }

  signinProcess(formdata : any){
    console.log(formdata)
    this._generateErrors();
    if (this.signinForm.valid) {
      this.authService.loginEmailPassword(formdata.value.email, formdata.value.password);
    }
  }
  // ERROR GENERATIONS
  private _generateErrors() {
    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // Set errors for fields not inside datesGroup
        // Clear previous error message (if any)
        this.formErrors[field] = '';
        CommonFunction._setErrMsgs(this.signinForm.get(field), this.formErrors, field, this.validationMessages);
      }
    }
  }
}
