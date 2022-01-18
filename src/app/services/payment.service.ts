import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private fireFunction:Functions) { }
  getOrder(){
    return httpsCallable(this.fireFunction,'helloWorld',{timeout:10000});
  }
}
