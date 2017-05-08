import { Component } from '@angular/core';
import { IonicPage, AlertController,ModalController,NavController, NavParams ,LoadingController, } from 'ionic-angular';
import { Http } from '@angular/http';
import { DataTabs } from '../../providers/datatabs';
import { Auth } from '../../providers/auth';
import 'rxjs/add/operator/map';
/**
 * Generated class for the Viewpage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-viewpage',
  templateUrl: 'viewpage.html',
})
export class Viewpage {
  public uptData:any; // parameters sends from tab page !
  public pozaUPT:any;
  public user:any; // this will be a global variable for status of user
  public posts:any;
  public title:any;
  public text:any;
  public newtext:any;
  public time:any;
  public info:any=[]; // data user recieve from provider
  public items: Array<{title: string, text: string, icon: string}>;
  constructor(
    public dataTabs: DataTabs,
    public alertCtrl: AlertController,
    public http: Http,
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: Auth,
    public loadingCtrl: LoadingController) {

  this.auth.login().then((isLoggedIn)=>{
      this.info = isLoggedIn;
      console.log(isLoggedIn)
      console.log(this.info,this.dataTabs.message.note)
  });

    this.items = [];
    this.newtext = localStorage.getItem('text');// ??
    this.time = new Date().getDay() +"/"+new Date().getMonth()+ "/"+new Date().getFullYear() +"  " +new Date().getHours()+":"+new Date().getMinutes() ; // current date will be replaced with date at eevery post
    this.user=localStorage.getItem('user') //user
    let loader = this.loadingCtrl.create({
          content: "Loading...",
        });
    loader.present();
    this.http.get('http://www.atestate-inf.tk/ghidtest/getdata.php?facultate='+ this.dataTabs.message.note).map(res => res.json()).subscribe(data => {
        this.posts = data;
        localStorage.removeItem('upt');
        loader.dismiss();
      });
  }


  doRefresh(refresher) {
    localStorage.removeItem('upt');
    this.http.get('http://www.atestate-inf.tk/ghidtest/getdata.php?facultate='+ this.dataTabs.message.note).map(res => res.json()).subscribe(data => {
      this.posts = data;
    });
  
    setTimeout(() => {
        refresher.complete();
    }, 1500);
  
  }


  ionViewDidLoad() {}


  presentProfileModal(item) {
    console.log(item)
    let profileModal = this.modalCtrl.create( 'FacultHome', { id: item });
    profileModal.present();
  }


 addNew() {
    let profileModall = this.modalCtrl.create( 'FacultHome', { idd: 1 , facultate:this.dataTabs.message.note});
    profileModall.present();
 }


  deleteProfil(item) {
    let confirm = this.alertCtrl.create({
      title: 'Do you want to delete this item?',
      message: 'If item is deleted it can t be restored',
      buttons: [{
        text: 'Disagree',
        handler: () => {
        console.log('Disagree clicked');
      }
      },{
        text: 'Agree',
        handler: () => {
          this.http.get('http://www.atestate-inf.tk/ghidtest/remove.php?delete='+item).map(res => res.json()).subscribe(data => {
          this.posts = data;});
      }
      }]
    });
    confirm.present();
  }
}
