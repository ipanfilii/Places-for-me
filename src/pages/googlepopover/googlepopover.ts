import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-googlepopover',
  templateUrl: 'googlepopover.html',
  providers: [InAppBrowser]
})
export class Googlepopover {
  public place : any = [];
  public booli: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
    console.log(navParams.get('place'))
    this.place = navParams.get('place')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Googlepopover');
  }
  public showData() {
    this.booli = !this.booli;
    console.log(this.booli)
  }
  public goToWebsite(placeWebsite: any) {
    //alert(this.place.website)
     const browser = this.iab.create(placeWebsite,"location=no");
     browser.show();
  }

  goToReservationsPage(placeForReservation){
    this.navCtrl.push("Reservations", {place:placeForReservation});
  }
}
