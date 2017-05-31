import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RoomTypesService } from "../../providers/room_types_service";
import { Http, Headers, RequestOptions } from '@angular/http';
import {CalendarController} from "ion2-calendar/dist";
@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
  providers: [InAppBrowser]
})
export class Statistics {
  public roomTypeData: any = [];
  public date: Date = new Date(Date.now());
  public showDetailsSingle: boolean = false;
  public showDetailsDouble: boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,private iab: InAppBrowser, private roomtypesservice: RoomTypesService,  public calendarCtrl: CalendarController){}

launch() {
     const browser = this.iab.create('https://www.google.ro/?gws_rd=cr,ssl&ei=EQUcWcv3LOTI6ASxp71A',"location=no");
     browser.show();
}

// testRoomTypes()
// {
//  this.roomtypesservice.retrieve_room_types().then((data)=>{
//       this.roomTypeData = data;
//        console.log(this.roomTypeData);  
    
//  });
 
// }

goToReservationsPage(){
  this.navCtrl.push('Reservations');
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad Statistics');
   // this.testRoomTypes();
  }

  showRooms(type) {
        console.log('1');
    let _daysConfig = [
      {
        date:new Date(2017,0,1),
        subTitle:'New Year\'s',
        marked:true
      },
      {
        date:new Date(2017,1,14),
        subTitle:'Valentine\'s',
        disable:true
      },
      {
        date:new Date(2017,3,1),
        subTitle:'April Fools',
        marked:true
      },
      {
        date:new Date(2017,3,7),
        subTitle:'World Health',
        marked:true
      },
      {
        date:new Date(2017,4,31),
        subTitle:'No-Smoking',
        marked:true
      },
      {
        date:new Date(2017,5,1),
        subTitle:'Children\'s',
        marked:true
      }
    ];

    //_daysConfig.push(...this.days);

 
    this.showDetailsDouble = true;
    this.showDetailsSingle = false;
    console.log('2');
      this.calendarCtrl.openCalendar({
        from: new Date(2017,0,1),
        to  : new Date(2017,11.1),
        daysConfig:_daysConfig
    })
    .then( res => { alert(res) } );
  }
}
