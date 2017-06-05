import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, ToastController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  public user: any;
  public grupa: number;
  public dataXls: any = [];
  public myRoute: any = [];
  public zi: any = [];
  public oneDay: any;
  public dataUser: Array<{user: string, image: string, showDetails: boolean, grupa:number, icon:string, zi:any[]}> = [];
  constructor(public navCtrl: NavController, 
              public http: Http,
              private nativeStorage: NativeStorage,
              private platform: Platform,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController) { }


  ionViewCanEnter() {
     
    this.user = localStorage.getItem('user');
  
    if( this.user ) {
      this.http.get('http://localhost/reqData.php?user='+this.user).map(res => res.json()).subscribe(data => {
        this.myRoute = data;
        console.log(this.myRoute)
      });

      
    } else {
      let toast = this.toastCtrl.create({
        message: 'Nu sunteti logat. Pentru a accesa aceasta sectiune este nevoie sa va logati.',
        duration: 3000,
        position: 'bottom'
      })
      toast.present();
      this.navCtrl.setRoot('WelcomeAfterLogin');
    }
  }
  public toggleDetails(data, zi) {

    this.oneDay = zi;
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'arrow-down';
    } else {
      data.showDetails = true;
      data.icon = 'close';
    }

  }
  
  public createRoute(data) {
    this.navCtrl.push('Routeprofile',{data:data});
    let toast = this.toastCtrl.create({
        message: 'Google maps is loading ... Please wait',
        duration: 2000,
        position: 'bottom'
      })
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }


 addNewEvent() {
    let profileModall = this.modalCtrl.create( 'CreateEvent', { idd: 1 , placeID: 3 }); 
    profileModall.present();
 }
}
