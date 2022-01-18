import { Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicScriptLoaderService } from './web/includes/services/dynamic-script-loader.service';
import { DatabaseService } from './services/database.service';
import { AuthencationService } from './services/authencation.service';
import { DataProvider } from './providers/data.provider';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

declare var $:any;
declare var jQuery :any;
declare var jquery : any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/animations/paymentComplete.json',
  };
  innerHeight:number = window.innerHeight;
  title = 'Beema Dukaan';
  // items : any = [];
  items: Observable<any[]>;
  constructor(private _activatedRoute : ActivatedRoute, public dataService:DatabaseService,public authService:AuthencationService,public dataProvider: DataProvider) {
    //const collections = collection(this.fs, 'items');
    //this.items = this.fs.collection('items').valueChanges();
    //this.item$ = collectionData(collections);
    //console.log("items", this.items)


   }
  observer: MutationObserver | undefined;
  
  ngOnInit(): void {
    console.log("innerHeight", this.innerHeight)
    this._activatedRoute.params.forEach((params: any) => {
      console.log(params)
     });
    //const data = this.exampleGetCollection();
    //console.log(data)
  }
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  // exampleGetCollection(){
  //   return this.fs.collection("items");
  // }
  ngAfterViewInit(): void {

  }
}
