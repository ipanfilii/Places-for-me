import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomTypesService 
{
   public roomsTypeData: any = [];

   constructor(public http:Http){}

   retrieve_room_types()
    {
    // let headers = new Headers();
    // headers.append("Accept",'application/json');
    // headers.append('Content-Type','application/json');
    // let options = new RequestOptions({headers:headers});
    
 return new Promise((resolve) => {
        this.http.get('http://192.168.43.96/room_type_reqData.php').map(result => result.json()).subscribe(data => {
        this.roomsTypeData = data;
        resolve(this.roomsTypeData);
        //console.log(this.roomsTypeData);
        })
      });
    }
}