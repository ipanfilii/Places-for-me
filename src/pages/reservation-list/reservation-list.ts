import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  public reservation: any [];
  public reservationForm: any [];
  public hotelID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reservation = navParams.get('reservationList');
    this.reservationForm = navParams.get('formReservation');
    this.hotelID = navParams.get('hotelId');
    console.log(this.hotelID);
    console.log(this.reservation)
    console.log(this.reservationForm)
    
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationList');
  }

  public reserveRoom(item) {

  }
}
