import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;

@IonicPage()
@Component({
  selector: 'page-routeprofile',
  templateUrl: 'routeprofile.html',
})
export class Routeprofile {
  @ViewChild('map') mapElement;
  public setDisplay: any =  new google.maps.InfoWindow;
  public map: any;
  public marker:any;  
  public position: any;
  public dataRecieve: any[]=[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataRecieve = navParams.get('data');
    console.log(this.dataRecieve)
  }

  ionViewDidLoad() {
    this.setMap(this.dataRecieve)
  }

  public setMap(dataRecieve) {
    let myLocation = new google.maps.LatLng(dataRecieve.lat, dataRecieve.lng);
    let setOptions = { 
        zoom:15,
        center:myLocation ,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map'), setOptions);
    this.marker = new google.maps.Marker({map: this.map,position:myLocation})
    this.setDisplay.setContent('Info: '+dataRecieve.address);
    this.setDisplay.open(this.map, this.marker);
  }
}
