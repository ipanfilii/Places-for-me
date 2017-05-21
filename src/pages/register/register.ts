import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { IonicPage, NavController, MenuController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public myForm:any;
  public dataUser: any;

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController,
              public menuCtrl: MenuController,
              public navParams: NavParams,  
              public http: Http,
              private formBuilder: FormBuilder) {
     this.myForm = this.formBuilder.group({
       
        username: [''],
        password: [''],
        email: [''],
    });
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
      user:this.myForm._value.username,
      pwd:this.myForm._value.password,
      email:this.myForm._value.email
    }
      //loader.present();
      this.http.post('http://192.168.43.96/register.php',JSON.stringify(postParams),options).map(res => res.json()).subscribe(data=>{
      this.dataUser = data;
      console.log(this.dataUser)
      
      if(this.dataUser.success)
        { 
          this.navCtrl.setRoot('Login');
        }
      else
        {
          registerFail.present(); // if login fail show a message error
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
