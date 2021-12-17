import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulService } from 'src/app/services/contentful.service';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs : any = [
    {
      id : 1,
      name : 'Which Policy is best for you?',
      date : '22 OCT, 2021',
      description : 'This is a blog description',
      image : 'news-1.jpg'
    },
    {
      id : 2,
      name : 'Which Insurance is good?',
      date : '25 OCT, 2021',
      description : 'This is a blog description',
      image : 'news-2.jpg'
    },
    {
      id : 3,
      name : 'What is Car Insurance?',
      date : '18 OCT, 2021',
      description : 'This is a blog description',
      image : 'news-1.jpg'
    },
    {
      id : 4,
      name : 'How to compare rates?',
      date : '22 OCT, 2021',
      description : 'This is a blog description',
      image : 'news-2.jpg'
    },
  ]
  constructor(private _contentful:ContentfulService) { }
  private products: Entry<any>[] = [];
  ngOnInit(): void {
    this._contentful.getProducts()
    .then(products => {
      console.log(products);
      this.products = products;
      products.forEach(product => {
        console.log(product.fields.body);
        console.log(documentToHtmlString(product.fields.mainBody));
      })
    });
  }

}
