import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataTabs {

  public message: any = [];
  constructor() { }

  setMessage(message){
    this.message = message;
  }
}