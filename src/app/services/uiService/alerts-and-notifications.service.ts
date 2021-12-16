import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsAndNotificationsService {

  constructor() { }
  public notify(data:string){
    // TODO: Unimplemented material snackbar
    console.log(data);
  }
}
