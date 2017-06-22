import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Connectivity } from './connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
@Injectable()
export class GoogleMaps {

  public mapElement: any;
  public pleaseConnect: any;
  public map: any;
  public mapInitialised: boolean = false;
  public mapLoaded: any;
  public mapLoadedObserver: any;
  public currentMarker: any;
  public apiKey: string = "AIzaSyDGwm40uW1SuvfKI6Kc_9ud8v-ooj8BbrM";
  public positionMap: any;
  constructor(public connectivityService: Connectivity, public geolocation: Geolocation) {

  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

   return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=geometry&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      } else {

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
       //   this.disableMap();
        }

        resolve(true);

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;
    let latLng = new google.maps.LatLng('45.748507', '21.239703');

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement, mapOptions);
    return new Promise((resolve) => {
    let options = {
          frequency: 3000, 
          enableHighAccuracy: true,
          timeout: 1000
        };
      this.geolocation.getCurrentPosition(options).then((position) => {
        this.positionMap = position;
        console.log(this.positionMap)
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
       resolve(true);

      }).catch((err) => {
     
        let mapOptions = {
          center: new google.maps.LatLng('45.748507', '21.239703'),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
       

        this.map = new google.maps.Map(this.mapElement, mapOptions);
       resolve(true);
      });

    });

  }

  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {

      this.disableMap();

    });

  }

}