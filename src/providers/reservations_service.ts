import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomReservationService 
{
   public reservationData: any = [];

   constructor(public http:Http){}

   retrieve_reservation_details(hotelid: any, roomid: any, checkin: any, checkout: any)
    {
      console.log('dadad')
      console.log(hotelid)
      
     let headers = new Headers();
     headers.append("Accept",'application/json');
     headers.append('Content-Type','application/json');
     let options = new RequestOptions({headers:headers});
      let postParams = {
      hotelid: hotelid,
      roomid: roomid,
      checkin: checkin,
      checkout: checkout
      }
    
 return new Promise((resolve) => {
        this.http.get('http://localhost/reservations_request_data.php?hotelid='+hotelid+"&roomid="+roomid+"&checkin="+checkin+"&checkout="+checkout).map(result => result.json()).subscribe(data => {
        this.reservationData = data;
        resolve(this.reservationData);
        //console.log(this.roomsTypeData);
        })
      });
    }
}