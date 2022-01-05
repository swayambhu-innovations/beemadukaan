import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicScriptLoaderService } from './web/includes/services/dynamic-script-loader.service';
import { DatabaseService } from './services/database.service';
import { AuthencationService } from './services/authencation.service';
import { DataProvider } from './providers/data.provider';

declare var $:any;
declare var jQuery :any;
declare var jquery : any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Beema Dukaan';
  // items : any = [];
  items: Observable<any[]>;
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private elRef: ElementRef, private renderer: Renderer2, public dataService:DatabaseService,public authService:AuthencationService,public dataProvider: DataProvider) {
    //const collections = collection(this.fs, 'items');
    //this.items = this.fs.collection('items').valueChanges();
    //this.item$ = collectionData(collections);
    //console.log("items", this.items)
   }
  observer: MutationObserver | undefined;
  ngOnInit(): void {
    //const data = this.exampleGetCollection();
    //console.log(data)
  }
  // exampleGetCollection(){
  //   return this.fs.collection("items");
  // }
  ngAfterViewInit(): void {

  }
}
