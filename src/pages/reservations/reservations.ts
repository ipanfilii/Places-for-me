import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelsListService } from "../../providers/hotels_list_service";

import { FormBuilder } from '@angular/forms';
import { RoomTypesService } from "../../providers/room_types_service";
/**
 * Generated class for the Reservations page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html',
})
export class Reservations {

   private logedUser: string = '';
   public hotelsListData: any = [];
   public roomTypeData: any = [];
   public reservationForm: any;
   private hotelid: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private hotelsListService:HotelsListService,  public formBuilder: FormBuilder, private roomtypesservice: RoomTypesService) {
     this.logedUser = localStorage.getItem('user');
     this.reservationForm = this.formBuilder.group({
                user: [this.logedUser],
                hotel: [], 
                roomType: []
              });
  }

  retrieveHotelsListData()
  {
    this.hotelsListService.retrieve_hotels_list().then((data)=>{
      this.hotelsListData = data;
       console.log(this.hotelsListData); 
      
 });
  }

  retrieveRoomTypesData(){
   // console.log(this.reservationForm._value.hotel);
   this.hotelid= this.reservationForm._value.hotel;
    this.roomtypesservice.retrieve_room_types(this.hotelid).then((data)=>{
      this.roomTypeData = data;
       console.log(this.roomTypeData);  
 });
  }

  formSubmit(){
    console.log(this.reservationForm._value.hotel);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Reservations');
     this.retrieveHotelsListData();
    //  this.retrieveRoomTypesData(this.reservationForm._value.hotel);
   
    
  }
  // ionViewWillEnter()
  // {
  //  //  this.retrieveHotelsListData();
  //   //  this.retrieveRoomTypesData();
  //    this.retrieveRoomTypesData(this.reservationForm._value.hotel);
  // }

}
