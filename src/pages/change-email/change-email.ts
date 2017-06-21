import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, Platform, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import { stringify } from "@angular/core/src/util";

@IonicPage()
@Component({
  selector: 'page-change-email',
  templateUrl: 'change-email.html',
})
export class ChangeEmail {
  public changeEmailForm: any;
  public changeEmailData: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http) 
    {
        this.changeEmailForm= this.formBuilder.group({
                current_mail: [''],
                new_mail: [''],
               
              });
              console.log(navParams.get('user'));
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeEmail');
  }
  changeEmail()
    { 
          let headers = new Headers();
    headers.append("Accept",'application/json');
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers});

    let postParams = {
      old_mail:this.changeEmailForm._value.current_mail,
      future_mail:this.changeEmailForm._value.new_mail,
       user: this.navParams.get('user')
    }
      this.http.post('http://hainedefirmasj.com/placesforme//change_email.php',JSON.stringify(postParams),options).map(res => res.json()).subscribe(data=>{
      this.changeEmailData = data;
      console.log(this.changeEmailData);
      alert('E-mail was succesfully modified');
      this.navCtrl.pop();

    },error=>{
      console.log(error);
    });
     //this.n
     
    }

    }
