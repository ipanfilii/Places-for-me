import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Getlocation } from '../../providers/getlocation';
import { Diagnostic } from '@ionic-native/diagnostic';

declare var google;

@IonicPage()
@Component({
  selector: 'page-googlemaps',
  templateUrl: 'googlemaps.html',
})
export class Googlemaps {
  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public locationOfMap: any;
  constructor(private diagnostic: Diagnostic,
              public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public location: Getlocation) {

  }

   loadSetGoogle() {
    let confirm = this.alertCtrl.create({
      title: 'Nu s-a putut determina locatia',
      message: 'Pentru a putea obtine locatia curenta va rugam sa activati GPS cu optiunea de precizie ridicata!',
      buttons: [
        {
          text: 'Renunta',
          handler: () => {
            this.toastCtrl.create({
              message: 'Nu s-a putut determina locatia cu acuratete maxima !',
              duration: 3000
            }).present();
          }
        },
        {
          text: 'Activeaza',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewCanEnter() {
    
    let successCallback = (isAvailable) => { if(!isAvailable) { this.loadSetGoogle(); }  };
    let errorCallback = (e) => console.log(e);
    this.diagnostic.isGpsLocationAvailable().then(successCallback).catch(errorCallback);
  //  this.diagnostic.isGpsLocationEnabled().then(successCallback, errorCallback);
  }

  ionViewDidLoad() {
    this.loadMap();
    this.location.startTracking();
  }

  ionViewDidLeave() {
    this.location.stopTracking();
  }
  /**
   * loadMap
   */
  public loadMap() {
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.") ;
    }
    function showPosition(position) {
      alert(position.coords.latitude+' '+ position.coords.longitude)
    }
    this.locationOfMap = new google.maps.LatLng( '45.747211', '21.228900' );

    let mapOptions = {
      center: this.locationOfMap,
      zoom: 15,
      mapeTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  }


}
