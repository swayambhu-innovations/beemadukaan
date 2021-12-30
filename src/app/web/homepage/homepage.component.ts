import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulService } from 'src/app/services/contentful.service';
import { post } from 'src/app/structures/method.structure';

declare var $:any;
declare var jQuery :any;
declare var jquery : any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {
  blogs : post[] = []
  constructor(private _contentful:ContentfulService) { }
  data : any;
  isActive : boolean = false;
  private products: Entry<any>[] = [];
  ngOnInit(): void {
    $.getScript('assets/js/script.js');

    setTimeout(() => {
      $("#addons-options-modal").modal('show');
    }, 5000);
    this.data = [
      {
        id : 1,
        isActive : true,
        title : 'Is it mandatory to have car insurance in India?​',
        description : 'Yes, motor insurance is mandatory in India. You have to have at least a third-party car insurance policy in India. It is a statutory requirement as per the Motor Vehicles Act, 1988.'
      },
      {
        id : 2,
        isActive : false,
        title : 'What is car insurance?​',
        description : 'It is an insurance policy that protects cars against damage or loss resulting from an accident, theft or any other third-party liability. You can buy car insurance online or by visiting a Liberty General Insurance branch.'
      },
      {
        id : 3,
        isActive : false,
        title : 'When do you buy a commercial car insurance policy?​',
        description : 'A commercial car insurance policy is required if you use or operate a commercial vehicle up to 3500 GVW. For example, a black and yellow taxi.'
      },
      {
        id : 4,
        isActive : false,
        title : 'Why purchase car insurance online?​',
        description : 'It is beneficial to buy a car policy online in India, as there are various policies from which to choose. You can make more informed decisions. When you buy any car policy online, research thoroughly and then decide. Buying online also helps you save time and money. You can also get more benefits.'
      }
    ]
    this.getPosts()
  }
    //Accordion Box
  toggleAccordian(event : any, index : any) {
      var element = event.target;
      console.log(element)
      //element.classList.toggle("active");
      console.log(this.data[index].isActive)
      let activeID = this.data[index].id;
      if(this.data[index]) {
        this.data[index].isActive = true;
        this.data.filter((x : any) => {
          if(x.id != activeID){
            x.isActive = false
          }
        });
      }
  }
  getPosts(){
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
