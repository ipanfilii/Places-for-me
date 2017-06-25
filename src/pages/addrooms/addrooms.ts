import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { IonicPage, NavController, MenuController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RoomTypesService } from "../../providers/room_types_service";
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-addrooms',
  templateUrl: 'addrooms.html',
})
export class Addrooms {

  public newTypeForm: any;
  public existingTypeForm: any;
  public typeData: any;
  public insertRoomData: any;
  right: number;
   public roomTypeData: any = [];
  public userData: any;
  public newTypeButtonClicked: boolean = false; //Whatever you want to initialise it as
  public existingTypeButtonClicked: boolean = false; 

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController,
              public menuCtrl: MenuController,
              public navParams: NavParams,  
              public http: Http,
              private roomtypesservice: RoomTypesService,
              private formBuilder: FormBuilder) {
                console.log(JSON.parse(localStorage.getItem('hotel')))
     this.newTypeForm = this.formBuilder.group({
       
        name: [''],
        short_name: [''],
        base_availability: [0],
        base_price: [0],
        max_occupancy: [0],
        room_number:[0]
    });
  
    
this.existingTypeForm = this.formBuilder.group({

          roomType: [''],
          numar: [''],
        });

    this.right = navParams.get("right");
    console.log(this.right);
     this.http.get('http://hainedefirmasj.com/placesforme/create_room_types.php?user='+localStorage.getItem('user')).map(res => res.json()).subscribe(data => {

        this.userData = data; // tipuri camere
        console.log(this.userData);
         });
              }
  public registerForm() {

    let registerFail = this.toastCtrl.create({
      message: 'Room type already exists',
      duration: 2500,
      position: 'top'
    });
    
    let headers = new Headers();
    headers.append("Accept",'application/json');
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers});

     let postParams = {
       name:this.newTypeForm._value.name,
       short_name:this.newTypeForm._value.short_name,
       base_availability:this.newTypeForm._value.base_availability,
       base_price:this.newTypeForm._value.base_price,
       max_occupancy:this.newTypeForm._value.max_occupancy,
       room_number:this.newTypeForm._value.room_number,
       user: localStorage.getItem('user')

     }
 
      //loader.present();
       this.http.post('http://hainedefirmasj.com/placesforme/room_type_sendData.php',JSON.stringify(postParams),options).map(res => res.json()).subscribe(data=>{
      this.typeData = data;
      
      let loginFail = this.toastCtrl.create({
      message: 'room type added with success',
      duration: 2500,
    });
      if(this.typeData.success)
       { 
         loginFail.present()
             this.http.get('http://hainedefirmasj.com/placesforme/create_room_types.php?user='+localStorage.getItem('user')).map(res => res.json()).subscribe(data => {

        this.userData = data; // tipuri camere
        console.log(this.userData);
         });
        }
       else
        {
           registerFail.present(); // if login fail show a message error
        }
     },error=>{
       console.log(error);
     });

  }

 onNewTypeButtonClick() {

        //this.newTypeButtonClicked = !this.newTypeButtonClicked;

        if(this.newTypeButtonClicked)
          { 
              this.newTypeButtonClicked=false;
             this.existingTypeButtonClicked=false;
           }
        else if(this.newTypeButtonClicked==false)
        {
            this.newTypeButtonClicked=true;
              this.existingTypeButtonClicked=false;
        }
    }

 onExistingTypeButtonClick() {

        this.existingTypeButtonClicked = !this.existingTypeButtonClicked;
        this.newTypeButtonClicked=false;
    }

  ionViewDidLoad() { }

   ionViewWillLeave() {

    this.menuCtrl.enable(true);

  }

   retrieveRoomTypesData(){
   console.log(this.existingTypeForm._value)
  }
 registerFormExisting() {
    let headers = new Headers();
    headers.append("Accept",'application/json');
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers});
 let successok = this.toastCtrl.create({
      message: 'Room added!',
      duration: 2500,
      position: 'top'
    });
     let postParams = {
       hotel_id: this.existingTypeForm._value.roomType.id_hotel,
       room_type: this.existingTypeForm._value.roomType.short_name,
       room_number:this.existingTypeForm._value.numar,
      // user: localStorage.getItem('user')

     }

   console.log(this.existingTypeForm._value)
    this.http.post('http://hainedefirmasj.com/placesforme/insert_rooms.php',JSON.stringify(postParams),options).map(res => res.json()).subscribe(data => {

        this.insertRoomData = data; // tipuri camere
        successok.present();
         });
         
              }
}
