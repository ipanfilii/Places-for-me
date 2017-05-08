import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-orarcontent',
  templateUrl: 'orarcontent.html',
})
export class Orarcontent {
 public facData:any=[];
  public serie:any;
  public year:any;
  public val:Array<{title: string, icon: string, showDetails: boolean}> = [];
  public toggle:boolean = false;
  public grupe:any=[];
  public grupSend:any;
  public posts:any=[];
    public day:any[];
  // public ore:any[];
  public ore: Array<{day: string, grupa:string, orar: Array<{time: any, info: any}>}>;
  public data: Array<{title: string, icon: string, showDetails: boolean}> = [];
  constructor(  
                public navCtrl: NavController, 
                public http: Http,
                public navParams: NavParams) {

    this.http.get('http://www.atestate-inf.tk/ghidtest/readxls.php' ).map(res => res.json()).subscribe(data => {
        this.posts = data;
      });

  
    this.facData = navParams.get('facData');
    this.serie   = navParams.get('serie');
    this.year    = navParams.get('year');
    this.grupe = ['1.1','1.2','2.1','2.2','3.1','3.2','4.1','4.2','5.1','5.2','6.1','6.2'];
    this.day = ['luni','marti','miercuri','joi','vineri']
    console.log(this.facData,this.serie,this.year);
    /**
     * test data 
     */
    this.ore = [
          {
              day:'luni',
              grupa:'',
              orar:[
                {
                    time:'08:00-09:00',
                    info:'Algebra, (curs), prof. Profesor/n/sn'
                },{
                    time:'09:00-10:00',
                    info:''
                },{
                    time:'12:00-14:00',
                    info:'Analiza, (curs), prof. Profesor'
                },{
                    time:'14:00-16:00',
                    info:'free'
                },{
                    time:'16:00-18:00',
                    info:'free'
                },{
                    time:'18:00-20:00',
                    info:'free'
                }]
          },{
              day:'marti',
              grupa:'',
              orar:[]
          },{
              day:'miercuri',
               grupa:'',
              orar:[]
          },{
              day:'joi',
              grupa:'',
              orar:[]
          },{
              day:'vineri',
              grupa:'',
              orar:[]
          }];
          console.log(this.ore[0].orar[0].time)
    for(let i = 0; i < this.grupe.length; i++ ){
    this.data.push({
        title: this.grupe[i],
    //    details:this.data1[i],
        icon: 'arrow-down',
        showDetails: false,
       // ore:this.ore[i]

      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrarcontentPage');
  }

  navBack(){
    this.navCtrl.pop();
  }

  toggleVal(event,grupa){
    this.toggle = !this.toggle;
    this.grupSend = grupa;
    console.log(this.grupSend)
  }

   toggleDetails(data) {
    if (data.showDetails) {
          
        data.showDetails = false;
        data.icon = 'arrow-down';
        this.val = data;
    } else {
        data.showDetails = true;
        data.icon = 'close';
        this.val = data;
    }
    
  }

}
