import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class InsertReservationService 
{
   public reservationParameters: any = [];
   constructor(public http:Http){
   }

   retrieve_reservation_info(user: any, hotelid: any, roomid:any, checkin: any, checkout: any, roomtypeid: any)
    {
        let headers = new Headers();
     headers.append("Accept",'application/json');
     headers.append('Content-Type','application/json');
     let options = new RequestOptions({headers:headers});
      let postParams = {
      user : localStorage.getItem('user'),
      hotelid: hotelid,
      roomid: roomid,
      checkin: checkin,
      checkout: checkout,
      roomtypeid: roomtypeid
      }
  
      console.log(hotelid,user,roomid,checkin,checkout,roomtypeid);
      
 return new Promise((resolve) => {
        this.http.post('http://192.168.43.95/insert_reservations_sendData.php',JSON.stringify(postParams),options).map(result => result.json()).subscribe(data => {
         this.reservationParameters = data;
        resolve(this.reservationParameters);
        // // //console.log(this.roomsTypeData);
        })
      });
    }
}