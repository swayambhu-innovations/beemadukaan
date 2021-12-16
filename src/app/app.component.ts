import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DynamicScriptLoaderService } from './web/includes/services/dynamic-script-loader.service';
import {MatFormFieldModule} from '@angular/material/form-field';

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
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private elRef: ElementRef, private renderer: Renderer2 ) {
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
    this.loadScripts();
    //console.log('Dom change detected...');
    this.observer = new MutationObserver(mutations => {

      console.log('Dom change detected...');

    });
    var config = { attributes: true, childList: true, characterData: true };
    this.observer.observe(this.elRef.nativeElement, config);
  }
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('appear','owl','wow','script','validate').then(data => {
      // Script Loaded Successfully
      console.log("script loading")
    }).catch(error => console.log(error));
  }
}
