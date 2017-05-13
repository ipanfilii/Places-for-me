import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  public myForm: any;
  public dataUser: any;
  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController,
              public platform: Platform,
              public nativeStorage: NativeStorage,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public formBuilder: FormBuilder, 
              public http: Http) {

              this.menuCtrl.enable(false);
               
              if( localStorage.getItem('user') ) {
                this.toastCtrl.create({
                  message: 'Sunteti logat cu ' +  localStorage.getItem('user'),
                  duration: 1500,
                  position: 'top'
                }).present();
                this.navCtrl.setRoot('HomePage')
              }
              
              this.myForm = this.formBuilder.group({
                user: [''],
                password: ['']
              });

  }

  ionViewDidLoad() { }

  public logForm() {

    let loader = this.loadingCtrl.create({
      content: "Authentification...",
      duration: 750
    });

    let loginFail = this.toastCtrl.create({
      message: 'Failed',
      duration: 2500,
      position: 'top'
    });
    
    let headers = new Headers();
    headers.append("Accept",'application/json');
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers});

    let postParams = {
      user:this.myForm._value.user,
      pwd:this.myForm._value.password,
    }
      loader.present();
      this.http.post('http://www.atestate-inf.tk/ghidtest/login.php',JSON.stringify(postParams),options).map(res => res.json()).subscribe(data=>{
      this.dataUser = data;
        alert(this.dataUser)
      
      console.log(this.dataUser.data)
      if(this.dataUser.success){ 
        loader.dismiss();
        localStorage.setItem('user',this.dataUser.data)
        this.navCtrl.setRoot('HomePage',{item:this.dataUser});
      }
      else{
        loader.dismiss();
        loginFail.present(); // if login fail show a message error
      }
    },error=>{
      console.log(error);
    });

  }
   
  ionViewWillLeave() {

    this.menuCtrl.enable(true);

  }
}
