import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { IonicPage, NavController, MenuController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
/**
 * Generated class for the Addrooms page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addrooms',
  templateUrl: 'addrooms.html',
})
export class Addrooms {

  public newTypeForm: any;
  public existingTypeForm: any;
  public typeData: any;
  right: number;
  public newTypeButtonClicked: boolean = false; //Whatever you want to initialise it as
  public existingTypeButtonClicked: boolean = false; 

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController,
              public menuCtrl: MenuController,
              public navParams: NavParams,  
              public http: Http,
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

          name: [''],
          surname: [''],
          address: ['']
        });

    this.right = navParams.get("right");
    console.log(this.right);
  }

  public registerForm() {

    let registerFail = this.toastCtrl.create({
      message: 'Failed',
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
       room_number:this.newTypeForm._value.room_number
     }
      //loader.present();
       this.http.post('http://localhost/room_type_sendData.php',JSON.stringify(postParams),options).map(res => res.json()).subscribe(data=>{
      this.typeData = data;
       console.log(this.typeData)
      
      if(this.typeData.success)
       { 
           this.navCtrl.setRoot('RoomsManagement');
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

        this.newTypeButtonClicked = !this.newTypeButtonClicked;
    }

 onExistingTypeButtonClick() {

        this.existingTypeButtonClicked = !this.existingTypeButtonClicked;
    }

  ionViewDidLoad() { }

   ionViewWillLeave() {

    this.menuCtrl.enable(true);

  }
 
}
