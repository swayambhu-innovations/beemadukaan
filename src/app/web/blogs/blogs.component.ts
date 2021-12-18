import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulService } from 'src/app/services/contentful.service';
import { post } from 'src/app/structures/method.structure';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs : post[] = []
  constructor(private _contentful:ContentfulService) { }
  private products: Entry<any>[] = [];
  ngOnInit(): void {
    this._contentful.getPosts()
    .then(products => {
      console.log(products);
      this.products = products;
      products.forEach(product => {
        let postDate = (new Date(product.fields.postDate)).toLocaleDateString();
        this.blogs.push({
          id:product.sys.id,
          name:product.fields.title,
          date:postDate,
          image:product.fields.featuredMedia.fields.file.url,
          description:this.shortifyText(product.fields.excerpt),
        });
      })
    });
  }
  shortifyText(text:string){
    if(text.length > 100){
      return text.substring(0,100)+'...';
    }
    return text;
  }

}
