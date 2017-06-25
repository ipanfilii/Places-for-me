import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
import { OneSignal } from '@ionic-native/onesignal';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
@IonicPage()
@Component({
  selector: 'page-googlepopover',
  templateUrl: 'googlepopover.html',
  providers: [InAppBrowser]
})
export class Googlepopover {
  public place : any = [];
  public booli: boolean = false;
  public myLocation: any;
  public userId: any = '';
  public location: any;
  public register: boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private iab: InAppBrowser,   
              public http: Http,
              private launchNavigator: LaunchNavigator,
              public oneSignal: OneSignal) {
    console.log(navParams.get('place'))
    this.place = navParams.get('place')
    this.register = navParams.get('register');
    this.myLocation = navParams.get('myLocation');
    console.log(this.myLocation)
//    this.location = new google.maps.LatLng(this.place.geometry.location.lat(), this.place.geometry.location.lng())
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
     const browser = this.iab.create(placeWebsite, "location=no");
     browser.show();
  }

  goToReservationsPage(placeForReservation){
    this.navCtrl.push("Reservations", {place:placeForReservation});
  }

  launchGoogleNavigator(place) {
    let options: LaunchNavigatorOptions = {
      start: this.myLocation,
    };

this.launchNavigator.navigate([this.place.geometry.location.lat(),this.place.geometry.location.lng()], options)
  .then(
    success => console.log('Launched navigator'),
    error => alert('Error launching navigator' + error)
  );
  }
 goToRegister(place) {
   this.navCtrl.push('RegisterPage',{place:place, right:1 })
 }
  followPlace(place) {
    console.log(place);
      this.oneSignal.getIds().then((ids)=>{
      this.userId = ids.userId; // recieve de id device and send it to server 
      // add to db user phone id, username, place Id
      this.http.get('http://hainedefirmasj.com/placesforme/notification.php?id='+ this.userId+'&user='+localStorage.getItem('user')+'&place='+place.id).map(res => res.json()).subscribe(data => {
      });
    });
  }
}
