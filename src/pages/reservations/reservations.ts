import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelsListService } from "../../providers/hotels_list_service";

import { FormBuilder } from '@angular/forms';
import { RoomTypesService } from "../../providers/room_types_service";
import { RoomNumberService } from "../../providers/room_number_service";

@IonicPage()
@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html',
})
export class Reservations {

   private logedUser: string = '';
   public hotelsListData: any = [];
   public roomTypeData: any = [];
   public roomNumberData: any = [];
   public reservationForm: any;
   private hotelid: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private hotelsListService:HotelsListService,  public formBuilder: FormBuilder, 
  private roomtypesservice: RoomTypesService, private roomNumberService: RoomNumberService) {
     this.logedUser = localStorage.getItem('user');
     this.reservationForm = this.formBuilder.group({
                user: [this.logedUser],
                hotel: [], 
                roomType: [],
                roomNumber: []
              });
  }

  retrieveHotelsListData()
  {
    this.hotelsListService.retrieve_hotels_list().then((data)=>{
      this.hotelsListData = data;
       console.log(this.hotelsListData); 
      
 });
  }

  retrieveRoomTypesData(ev){
   
   this.hotelid= this.reservationForm._value.hotel;
   console.log(this.hotelid);
    this.roomtypesservice.retrieve_room_types(this.hotelid).then((data)=>{
      this.roomTypeData = data;
       console.log(this.roomTypeData);  
 });
  }

  retrieveRoomNumberData(event){
    this.hotelid= this.reservationForm._value.hotel;
   console.log(this.hotelid);
   this.roomNumberService.retrieve_room_numbers(this.hotelid).then((data)=>{
     this.roomNumberData = data;
     console.log(this.roomNumberData);
   });

  }

  formSubmit(){
    console.log(this.reservationForm._value.hotel);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Reservations');
     this.retrieveHotelsListData(); 
  }
}
