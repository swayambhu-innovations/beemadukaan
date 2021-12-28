import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonFunction } from 'src/app/common';
import { AuthencationService } from 'src/app/services/authencation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  validationMessages : any;
  formErrors : any = {
    email: '',
    password: '',
    name : '',
    phone : ''
  };
  constructor(private fb : FormBuilder, private authService : AuthencationService, private router : Router) {
    this.signupForm = this.fb.group({
      name : [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100)
        ]),
      ],
      email : [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(60)
        ]),
      ],
      phone : [
        null,
        Validators.compose([
          Validators.required,
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
      name : {
        required : `Please Enter Name`,
        maxLength : `Maximum 60 characters are allowed.`
      },
      phone : {
        required : `Please Enter Phone number`,
        maxLength : `Maximum 60 characters are allowed.`
      },
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

  signupProcess(formdata : any){
    console.log(formdata)
    this._generateErrors();
    if (this.signupForm.valid) {
      this.authService.signUpWithEmailAndPassword(formdata.value.email, formdata.value.password, formdata.value.name);
      this.router.navigateByUrl('/admin/dashboard')
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
        CommonFunction._setErrMsgs(this.signupForm.get(field), this.formErrors, field, this.validationMessages);
      }
    }
  }

}
