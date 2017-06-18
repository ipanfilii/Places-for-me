import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class HotelsListService 
{
   public hotelsListData: any = [];

   constructor(public http:Http){}

   retrieve_hotels_list()
    {
    // let headers = new Headers();
    // headers.append("Accept",'application/json');
    // headers.append('Content-Type','application/json');
    // let options = new RequestOptions({headers:headers});
    
 return new Promise((resolve) => {


        this.http.get('http://192.168.43.95/hotels_list_reqData.php').map(result => result.json()).subscribe(data => {
        this.hotelsListData = data;
        resolve(this.hotelsListData);
        //console.log(this.roomsTypeData);
        })
      });
    }
}