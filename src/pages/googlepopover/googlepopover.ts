import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
import { OneSignal } from '@ionic-native/onesignal';
@IonicPage()
@Component({
  selector: 'page-googlepopover',
  templateUrl: 'googlepopover.html',
  providers: [InAppBrowser]
})
export class Googlepopover {
  public place : any = [];
  public booli: boolean = false;
  public userId: any = '';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private iab: InAppBrowser,   
              public http: Http,
              public oneSignal: OneSignal) {
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

  followPlace(place) {
      this.oneSignal.getIds().then((ids)=>{
      this.userId = ids.userId; // recieve de id device and send it to server 
      // add to db user phone id, username, place Id
      this.http.get('http://192.168.43.95/notification.php?id='+ this.userId+'&user='+localStorage.getItem('user')+'&place='+place.id).map(res => res.json()).subscribe(data => {
      });
    });
  }
}
