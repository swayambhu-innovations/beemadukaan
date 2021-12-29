import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from 'src/app/services/contentful.service';
import { blog } from 'src/app/structures/method.structure';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonFunction } from 'src/app/common';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthencationService } from 'src/app/services/authencation.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
  blogID : any;
  blogData : blog;
  commentForm : FormGroup;
  validationMessages : any;
  formErrors : any = {
    name: '',
    comment: ''
  };
  commentsList : any = [];
  isLoggedInUser : any = false;
  userID : any;
  constructor(
    private activeRoute : ActivatedRoute,
    private _contentful:ContentfulService,
    private databaseService: DatabaseService,
    private alertify:AlertsAndNotificationsService, private fb : FormBuilder, private dataProvider : DataProvider, private authService : AuthencationService) {
    this.activeRoute.queryParams.subscribe((qp) => {
      // console.log('Get Router Params:', this.activeRoute.snapshot.params.id);
      this.blogID = this.activeRoute.snapshot.params.id
    });
    this.commentForm = this.fb.group({
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
        ]),
      ],
      comment: [
        null,
        Validators.compose([Validators.required]),
      ]
    });
    this.validationMessages = {
      name: {
        required: `Please Enter Name`,
        maxLength: `Maximum 100 characters allowed.`
      },
      comment: {
        required: `Please Enter Comment`
      }
    };


    console.log("log", this.isLoggedInUser)
    //let userID = this.dataProvider.userID;
    //this.isLoggedInUser = this.dataProvider.loggedIn;
    //console.log("user id", userID, "log in", this.isLoggedInUser)
  }
  ngOnInit(): void {
    let data = this._contentful.getPost(this.blogID);
    data.then((res: any) => {
      let postDate = (new Date(res.fields.postDate)).toLocaleDateString();
      this.blogData = {
        id:res.sys.id,
        name:res.fields.title,
        date:postDate,
        image:res.fields.featuredMedia.fields.file.url,
        description:res.fields.excerpt,
        body:documentToHtmlString(res.fields.mainBody),
        author:res.fields.authorName,
      };
    })
    this.getComments();
    this.authService.checkAuth().subscribe(
      (res) => {
        //console.log("res",res)
        this.isLoggedInUser = res.isLoggedIn;
        this.userID = res.response.uid;
      }
    );
  }
  getComments(){
    this.databaseService.getCommentById(this.blogID).then((res:any)=>{
      // console.log("res",res);
      this.commentsList= []
      res.forEach((comment: any) => {
        //console.log(comment.data());
        this.commentsList.push(comment.data())
      })
    })
  }
  addComment(formdata : any){
    this._generateErrors();
    if(formdata.valid){
      this.databaseService.addCommentById(this.blogID,{
        displayName: formdata.value.name,
        comment: formdata.value.comment,
        date:new Date(),
        uid:this.userID
      }).then((res:any)=>{
        this.alertify.presentToast('Comment added successfully','info',4000)
        this.getComments();
        this.resetForm();
      });
    }
  }

  // ERROR GENERATIONS1
  private _generateErrors() {
    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // Set errors for fields not inside datesGroup
        // Clear previous error message (if any)
        this.formErrors[field] = '';
        CommonFunction._setErrMsgs(this.commentForm.get(field), this.formErrors, field, this.validationMessages);
      }
    }
  }
  resetForm() {
    this.commentForm.reset();
    this.commentForm.markAsUntouched();
    this.commentForm.markAsPristine();

    this.formErrors = {
      name: '',
      comment: ''
    };
  }
}
