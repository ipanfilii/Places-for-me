import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RoomTypesService } from "../../providers/room_types_service";
//import { Connectivity } from './connectivity-s

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
  providers: [InAppBrowser]
})
export class Statistics {
 public rtd: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,private iab: InAppBrowser, private roomtypesservice: RoomTypesService){}

launch() {
     const browser = this.iab.create('https://www.google.ro/?gws_rd=cr,ssl&ei=EQUcWcv3LOTI6ASxp71A',"location=no");
     browser.show();
}

testRoomTypes()
{
 this.rtd= this.roomtypesservice.retrieve_room_types();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad Statistics');
  }
}
