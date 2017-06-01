import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelsListService } from "../../providers/hotels_list_service";

import { FormBuilder } from '@angular/forms';
import { RoomTypesService } from "../../providers/room_types_service";
import { RoomNumberService } from "../../providers/room_number_service";
import { RoomReservationService } from "../../providers/reservations_service";

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
   //private hotelid: number;
   public hotelInfo: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private hotelsListService:HotelsListService,  public formBuilder: FormBuilder, 
  private roomtypesservice: RoomTypesService, private roomNumberService: RoomNumberService, private roomReservationsService: RoomReservationService) {
     this.logedUser = localStorage.getItem('user');
     this.reservationForm = this.formBuilder.group({
                user: [this.logedUser],
                hotel: [], 
                roomType: [],
                startDate: [],
                endDate: []
              });
    this.hotelInfo = navParams.get('place');
    console.log(this.hotelInfo);
  }

  retrieveReservationData(){
  //  console.log(this.reservationForm._value);
    this.roomReservationsService.retrieve_reservation_details(this.hotelInfo.id, this.reservationForm._value.roomType,
    this.reservationForm._value.startDate,this.reservationForm._value.endDate);
  }

  retrieveHotelsListData()
  {
    this.hotelsListService.retrieve_hotels_list().then((data)=>{
      this.hotelsListData = data;
       console.log(this.hotelsListData); 
      
 });
  }

  retrieveRoomTypesData(){
    this.roomtypesservice.retrieve_room_types(this.hotelInfo.id).then((data)=>{
      this.roomTypeData = data;
       console.log(this.roomTypeData);  
 });
  }

  retrieveRoomNumberData(event){

   this.roomNumberService.retrieve_room_numbers(this.hotelInfo.id).then((data)=>{
     this.roomNumberData = data;
     console.log(this.roomNumberData);
   });

  }

  formSubmit(){
    console.log(this.reservationForm._value.hotel);

  }
  ionViewDidLoad() {
    this.retrieveRoomTypesData();
    console.log('ionViewDidLoad Reservations');
     this.retrieveHotelsListData(); 
  }
}
