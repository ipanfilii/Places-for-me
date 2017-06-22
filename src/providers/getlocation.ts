import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Platform } from 'ionic-angular';

@Injectable()
export class Getlocation {
  public watch: any;    
  public lat: number = 45.748507;
  public lng: number = 21.239703;
  constructor(public geolocation: Geolocation,
              public backgroundGeolocation: BackgroundGeolocation,
              public zone: NgZone,
              public platform: Platform) {
    // alert('Hello Getlocation Provider');
  }

  public startTracking()  {
 
  // Background Tracking
 
  // let config = {
  //   desiredAccuracy: 0,
  //   stationaryRadius: 20,
  //   distanceFilter: 10, 
  //   debug: false,
  //   interval: 2000 
  // };
 
  // this.backgroundGeolocation.configure(config).subscribe((location) => {
 
  //   console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
 
  //   // Run update inside of Angular's zone
  //   this.zone.run(() => {
  //     // this.lat = location.latitude;
  //     // this.lng = location.longitude;
  //   });
 
  // }, (err) => {
 
  //  // console.log(err);
 
  // });
 
  // Turn ON the background-geolocation system.
  // this.backgroundGeolocation.start();
 
 
  // Foreground Tracking
 this.platform.ready().then(() => {

      let options = {
      frequency: 3000, 
      enableHighAccuracy: true,
      timeout: 1000
    };
    this.geolocation.getCurrentPosition(options).then((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
    }).catch((error) => {
      this.lat = 45.748507;
      this.lng = 21.239703;
        console.log('Eroare: ' + error);
    });

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.coords !== undefined).subscribe((position: Geoposition) => {
    
      console.log(position);
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;
      });
    
    });
 })

 
}

public stopTracking() {
 
  // alert('stopTracking');
 
  // this.backgroundGeolocation.finish();
  // this.watch.unsubscribe();
 
}

}