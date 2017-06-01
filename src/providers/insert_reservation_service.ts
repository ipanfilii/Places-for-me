import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class InsertReservationService 
{
   public reservationParameters: any = [];

   constructor(public http:Http){}

   retrieve_reservation_info(hotelid: any, roomtypeid: any, checkin: any, checkout: any)
    {
      console.log('dadad')
      console.log(hotelid)
      
     let headers = new Headers();
 
 return new Promise((resolve) => {
        this.http.get('http://localhost/reservations_request_data.php?hotelid='+hotelid+"&roomtypeid="+roomtypeid+"&checkin="+checkin+"&checkout="+checkout).map(result => result.json()).subscribe(data => {
        // this.reservationData = data;
        // resolve(this.reservationData);
        // //console.log(this.roomsTypeData);
        })
      });
    }
}