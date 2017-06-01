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

   retrieve_room_types(hotelid: number)
    {
      console.log('dadad')
      console.log(hotelid)
      
     let headers = new Headers();
     headers.append("Accept",'application/json');
     headers.append('Content-Type','application/json');
     let options = new RequestOptions({headers:headers});
      let postParams = {
      hotelid: hotelid
      }
    
 return new Promise((resolve) => {
        this.http.post('http://192.168.43.95/room_type_reqData.php',JSON.stringify(postParams),options).map(result => result.json()).subscribe(data => {
        this.roomsTypeData = data;
        resolve(this.roomsTypeData);
        //console.log(this.roomsTypeData);
        })
      });
    }
}