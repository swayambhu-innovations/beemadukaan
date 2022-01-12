import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
  title = 'Beema Dukaan';
  // items : any = [];
  items: Observable<any[]>;
  constructor(private router: Router, private dynamicScriptLoader: DynamicScriptLoaderService, private _activatedRoute : ActivatedRoute, private elRef: ElementRef, private renderer: Renderer2, public dataService:DatabaseService,public authService:AuthencationService,public dataProvider: DataProvider) {
    //const collections = collection(this.fs, 'items');
    //this.items = this.fs.collection('items').valueChanges();
    //this.item$ = collectionData(collections);
    //console.log("items", this.items)


   }
  observer: MutationObserver | undefined;
  ngOnInit(): void {
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
