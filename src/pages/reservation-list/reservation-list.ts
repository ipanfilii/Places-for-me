import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InsertReservationService } from "../../providers/insert_reservation_service";

/**
 * Generated class for the ReservationList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reservation-list',
  templateUrl: 'reservation-list.html',
})
export class ReservationList {
  public reservationForm: any [];
  public user: any;
  public hotelID: any;
  public freeRooms: any [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private insertreservationservice: InsertReservationService) {
    this.freeRooms = navParams.get('reservationList');
    this.reservationForm = navParams.get('formReservation');
    this.hotelID = navParams.get('hotelId');
    console.log(this.hotelID);
    console.log(this.freeRooms)
    console.log(this.reservationForm)
    
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationList');
  }

  public reserveRoom(item) {
      this.insertreservationservice
  }
}
