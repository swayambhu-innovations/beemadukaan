import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from 'src/app/services/contentful.service';
import { blog } from 'src/app/structures/method.structure';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
  blogID : any;
  blogData : blog;
  constructor(private activeRoute : ActivatedRoute,private _contentful:ContentfulService) {
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
  }
}
