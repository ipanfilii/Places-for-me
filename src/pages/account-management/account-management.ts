import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, ToastController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AccountManagement page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-management',
  templateUrl: 'account-management.html',
})
export class AccountManagement {
   public posts: any;
public user: any;
  public grupa: number;
  public dataXls: any = [];
  public myRoute: any = [];
  public zi: any = [];
  public oneDay: any;
  public userData: any = [];
  public dataUser: Array<{user: string, image: string, showDetails: boolean, grupa:number, icon:string, zi:any[]}> = [];
  constructor(public navCtrl: NavController, 
              public http: Http,
              private nativeStorage: NativeStorage,
              private platform: Platform,   
              private modalCtrl: ModalController,
              private toastCtrl: ToastController) {
                this.http.get('http://192.168.43.95/login.php?user='+this.user).map(res => res.json()).subscribe(data => {

        this.userData = data;
        // localStorage.setItem('user', this.userData.username);
      });
                  this.http.get('http://192.168.43.95/getdata.php').map(res => res.json()).subscribe(data => {
        this.posts = data;
        localStorage.removeItem('upt');
        
      });
               }
  changeEmail(ev)
    {
        this.navCtrl.push('ChangeEmail',{user: localStorage.getItem('user')} );
        
    } 

     changePassword(ev)
    {
        this.navCtrl.push('ChangePassword',{user: localStorage.getItem('user')} );
        
    } 

    changePhotoProfile(ev)
    {
      this.navCtrl.push('EditProfile')
    }
  ionViewCanEnter() {
     
    this.user = localStorage.getItem('user');
  
    if( this.user ) {
      this.http.get('http://192.168.43.95/reqData.php?user='+this.user).map(res => res.json()).subscribe(data => {
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

 doRefresh(refresher) {
    localStorage.removeItem('upt');
    this.http.get('http://192.168.43.95/getdata.php').map(res => res.json()).subscribe(data => {
      this.posts = data;
    });
 }
}
