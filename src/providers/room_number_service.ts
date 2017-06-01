import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomNumberService 
{
   public roomNumberData: any = [];

   constructor(public http:Http){}

   retrieve_room_numbers(hotelid: number)
    {
      console.log(hotelid)
      
     let headers = new Headers();
     headers.append("Accept",'application/json');
     headers.append('Content-Type','application/json');
     let options = new RequestOptions({headers:headers});
      let postParams = {
      hotelid: hotelid
      }
    
 return new Promise((resolve) => {
<<<<<<< HEAD
        this.http.post('http://192.168.43.95/room_number_reqData.php',JSON.stringify(postParams),options).map(result => result.json()).subscribe(data => {
=======
        this.http.post('http://localhost/room_number_reqData.php',JSON.stringify(postParams),options).map(result => result.json()).subscribe(data => {
>>>>>>> 28dd2e53ec256c4fdf00493c7c2718cb353c64ea
        this.roomNumberData = data;
        resolve(this.roomNumberData);
        //console.log(this.roomsTypeData);
        })
      });
    }
}