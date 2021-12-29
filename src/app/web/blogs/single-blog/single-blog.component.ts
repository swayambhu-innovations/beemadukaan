import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from 'src/app/services/contentful.service';
import { blog } from 'src/app/structures/method.structure';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
  blogID : any;
  blogData : blog;
  constructor(
    private activeRoute : ActivatedRoute,
    private _contentful:ContentfulService,
    private databaseService: DatabaseService,
    private alertify:AlertsAndNotificationsService) {
    this.activeRoute.queryParams.subscribe((qp) => {
      // console.log('Get Router Params:', this.activeRoute.snapshot.params.id);
      this.blogID = this.activeRoute.snapshot.params.id
    });
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
    this.databaseService.getCommentById(this.blogID).then((res:any)=>{
      console.log(res);
      res.forEach((comment: any) => {
        console.log(comment.data());
      })
    })
  }
  addComment(){
    this.databaseService.addCommentById(this.blogID,{
      displayName:'John Doe',
      comment:'This is a comment',
      date:new Date(),
      uid:'12345'
    }).then((res:any)=>{
      this.alertify.presentToast('Comment added successfully','info',4000)
    });
    
  }
}
