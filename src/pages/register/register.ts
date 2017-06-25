import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { IonicPage, NavController, MenuController, Platform, ToastController, AlertController,LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public myForm:any;
  public dataUser: any;
  right: number;

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController,
              public menuCtrl: MenuController,
              public navParams: NavParams,  
              public http: Http,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder) {
     this.myForm = this.formBuilder.group({
       
        username: [''],
        password: [''],
        email: [''],
        hotel_name: [''],
        hotel_address: ['']
    });
    this.right = navParams.get("right");
    console.log(this.right);
  }

  public registerForm() {

    let registerFail = this.toastCtrl.create({
      message: 'Failed ! This username already exist.',
      duration: 2500,
      position: 'top'
    });
     let registerFailed = this.toastCtrl.create({
      message: 'Failed ! An error ocurred while processing your request.',
      duration: 2500,
      position: 'top'
    });
    let headers = new Headers();
    headers.append("Accept",'application/json');
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers});

    let postParams = {
      user:this.myForm._value.username,
      pwd:this.myForm._value.password,
      email:this.myForm._value.email,
      right:this.right,
      hotel_name:this.myForm._value.hotel_name,
      hotel_address:this.myForm._value.hotel_address
    }
      let confirm = this.alertCtrl.create({
      title: 'Success register',
      message: 'You need to activate your account from email for login.',
      buttons: [
       
        {
          text: 'OK',
          handler: () => {
             setTimeout(this.navCtrl.setRoot('Login'),1500);
          }
        }
      ]
    });
      //loader.present();
      this.http.post('http://hainedefirmasj.com/placesforme/register.php',JSON.stringify(postParams),options).map(res => res.json()).subscribe(data=>{
      this.dataUser = data;
      console.log(this.dataUser)
          this.http.get("http://hainedefirmasj.com/placesforme/mailsend.php?user="+this.myForm._value.username+'&email='+this.myForm._value.email).map(result => result.json()).subscribe(data => {
        //console.log(this.roomsTypeData);
        })      
      
      if(this.dataUser.success == true)
        { 
          confirm.present();
        }
      else if(this.dataUser.success == false)
        {
          registerFail.present(); // if login fail show a message error
        } 
        else 
        {
registerFailed.present()
        }
    },error=>{
      console.log(error);
    });

  }

  ionViewDidLoad() { }

   ionViewWillLeave() {

    this.menuCtrl.enable(true);

  }
 
}
