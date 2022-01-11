import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulService } from 'src/app/services/contentful.service';
import { post } from 'src/app/structures/method.structure';

declare var $:any;
@Component({
  selector: 'app-other-insurance',
  templateUrl: './other-insurance.component.html',
  styleUrls: ['./other-insurance.component.css']
})
export class OtherInsuranceComponent implements OnInit {

  blogs : post[] = []
  constructor(private _contentful:ContentfulService) { }
  private products: Entry<any>[] = [];

  ngOnInit(): void {
    $.getScript('assets/js/accordion.js');
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
  scroll(el: HTMLElement) {
    console.log(el)
    el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
