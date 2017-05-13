import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { Http } from '@angular/http';
import { OneSignal } from '@ionic-native/onesignal';

/**
 * Generated class for the Facultati page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-facultati',
  templateUrl: 'facultati.html',
})
export class Facultati {
  public user: string;
  public id: any;
  public dataUser: any = [];
  public idFacultati: string[] =[];
  public facultati: string[] = []
  public serii: string[] = [];
  public infoFacultati: any[] = [];
  public danger: string = "danger";
  public favorite: string = "Follow";
  constructor(public navCtrl: NavController,
              public oneSignal: OneSignal,
              public http: Http,
              public navParams: NavParams,
              public auth: Auth,
              public platform: Platform,
              public nativeStorage: NativeStorage,
              public toastCtrl: ToastController) {
              this.user = localStorage.getItem('user');
          
    this.auth.login().then((isLoggedIn) => {
      this.dataUser = isLoggedIn;
    //  this.selectedItem = navParams.get('item');
      this.idFacultati= ['ACUPT','CHIUPT','EEUPT','ETCUPT','MECUPT','MPTUPT','OSTLUPT'];
      this.facultati = [
        'Facultatea de Automatica si Calculatoare',
        'Facultatea de Chimie Industriala si Ingineria Mediului',
        'Facultatea Electrotehnica si Electroenergetica',
        'Facultatea de Electronica si Telecomunicatii',
        'Facultatea de Mecanica',
        'Facultatea de Management si Productie in Transporturi',
        'Facultatea de Arhitectura si Urbanism'];
      this.infoFacultati = [];
      // If we navigated to this page, we will have an item available as a nav param
      if(this.dataUser.data == "user"){
          for(let i = 0; i < 7; i++) {
            // for(let j = 0; j < this.info.follow.length; j++){
            //   if(this.notes[i] == this.info.follow[j].value && this.info.follow[j].counter == 1 ){
            //       this.danger = "secondary";
            //       this.favorite = "Unfollow";
            //   }
            //   else if(this.notes[i] == this.info.follow[j].value && this.info.follow[j].counter == 0){
            //     this.danger = "danger";
            //     this.favorite = "Follow"
            //   }
            // }
            if(this.idFacultati[i] == 'ACUPT'){
              this.serii = ['Ingineria Sistemelor','Calculatoare si Tehnologia Informatiei','Informatica']
            }
            else{
              this.serii = [];
            }
            this.infoFacultati.push({
              title: this.facultati[i] ,
              note: this.idFacultati[i],
              iconActive:"",
              faculties:this.facultati[i],
              favorite:"",
              serie:this.serii
            });
          }
      } else {
        for(let i = 0; i < 7; i++) {
          for(let j = 0; j < this.dataUser.follow.length; j++) {
            if(this.idFacultati[i] == this.dataUser.follow[j].value && this.dataUser.follow[j].counter == 1 ) {
                this.danger = "secondary";
                this.favorite = "Unfollow";
              } else if(this.idFacultati[i] == this.dataUser.follow[j].value && this.dataUser.follow[j].counter == 0) {
                this.danger = "danger";
                this.favorite = "Follow"
              }
            }

            if(this.idFacultati[i] == 'ACUPT') {
                this.serii = ['Ingineria Sistemelor','Calculatoare si Tehnologia Informatiei','Informatica']
            } else {
              this.serii = [];
            }

            this.infoFacultati.push({
              title: this.facultati[i],
              note: this.idFacultati[i],
              iconActive:this.danger,
              faculties:this.facultati[i],
              favorite:this.favorite,
              serie:this.serii
            });
          }
        }
     });
  }

  addFollow(itemss) {
    
    this.oneSignal.getIds().then((ids)=>{
      this.id = ids.userId; // recieve de id device and send it to server 
      this.http.get('http://www.atestate-inf.tk/ghidtest/notification.php?id='+ this.id+'&user='+this.user+'&facultate='+itemss.idFacultati/*+'&ids='+Device.uuid*/ ).map(res => res.json()).subscribe(data => {
        // this.posts = data;
      });
    });

    for(let  i = 0; i < 7; i++) {
      if(this.infoFacultati[i].title == itemss.title && this.infoFacultati[i].iconActive == "danger"){
        this.infoFacultati[i].iconActive = "secondary";
        this.infoFacultati[i].favorite = "FAVORITE";
        let toast = this.toastCtrl.create({
          message:  'Now you follow '+ this.infoFacultati[i].faculties+' news!',
          duration: 1500 ,
          position: 'top'
        });
        toast.present();
      } else if(this.infoFacultati[i].title == itemss.title && this.infoFacultati[i].iconActive == "secondary") {
        this.infoFacultati[i].iconActive = "danger";
        this.infoFacultati[i].favorite ="Add to favorite";
      }
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Facultati');
  }

  public facultate(event, item) {
    this.navCtrl.push('Paginafacultate', {
      item: item
    });
  }
}
