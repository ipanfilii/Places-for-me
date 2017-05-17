import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
@Injectable()
export class Getlocation {
  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;
  constructor(public geolocation: Geolocation,
              public backgroundGeolocation: BackgroundGeolocation,
              public zone: NgZone,) {
    // alert('Hello Getlocation Provider');
  }

  public startTracking()  {
 
  // Background Tracking
 
  let config = {
    desiredAccuracy: 0,
    stationaryRadius: 20,
    distanceFilter: 10, 
    debug: false,
    interval: 2000 
  };
 
  this.backgroundGeolocation.configure(config).subscribe((location) => {
 
    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
 
    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = location.latitude;
      this.lng = location.longitude;
    });
 
  }, (err) => {
 
    console.log(err);
 
  });
 
  // Turn ON the background-geolocation system.
  this.backgroundGeolocation.start();
 
 
  // Foreground Tracking
 
let options = {
  frequency: 3000, 
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};
 
this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.coords !== undefined).subscribe((position: Geoposition) => {
 
  console.log(position);
 
  // Run update inside of Angular's zone
  this.zone.run(() => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  });
 
});
 
}

public stopTracking() {
 
  // alert('stopTracking');
 
  this.backgroundGeolocation.finish();
  this.watch.unsubscribe();
 
}

}