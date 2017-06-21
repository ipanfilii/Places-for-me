import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import { stringify } from "@angular/core/src/util";

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePassword {

  public changePasswordForm: any;
  public changePasswordData: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http) 
    {
         this.changePasswordForm= this.formBuilder.group({
                current_password: [''],
                retyped_current_password: [''],
                new_password: ['']
              });
              console.log(navParams.get('user'));
    }

    changePassword()
      {
        let headers = new Headers();
    headers.append("Accept",'application/json');
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers});

if(this.changePasswordForm._value.current_password === this.changePasswordForm._value.retyped_current_password)
{
    let postParams = {
      old_password: this.changePasswordForm._value.current_password,
      future_password:this.changePasswordForm._value.new_password,
     user: this.navParams.get('user')
    
}
      this.http.post('http://hainedefirmasj.com/placesforme//change_password.php',JSON.stringify(postParams),options).map(res => res.json()).subscribe(data=>{
      this.changePasswordData = data;
      console.log(this.changePasswordData);
      alert('Password was succesfully modified');
      this.navCtrl.pop();

    },error=>{
      console.log(error);
    });
     
    }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePassword');
  }

}
