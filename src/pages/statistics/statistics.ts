import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RoomTypesService } from "../../providers/room_types_service";
import { Http, Headers, RequestOptions } from '@angular/http';
import {CalendarController} from "ion2-calendar/dist";
import { Chart } from 'chart.js'; // chart module
@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
  providers: [InAppBrowser]
})
export class Statistics {
    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;
    public roomStatisticsData: any = [];
    public roomNameData: any = [];
    public reservationsNumber: any = [];
    public hotelStatisticsData: any = [];
    public hotelNameData: any = [];
    public reservationsNumberHotels: any = [];
  public roomTypeData: any = [];
  public date: Date = new Date(Date.now());
  public showDetailsSingle: boolean = false;
  public showDetailsDouble: boolean = false
  constructor(public http: Http,public navCtrl: NavController, public navParams: NavParams, platform: Platform,private iab: InAppBrowser, private roomtypesservice: RoomTypesService,  public calendarCtrl: CalendarController){
 this.http.get('http://hainedefirmasj.com/placesforme//retrieve_statistics_Data.php').map(result => result.json()).subscribe(data => {
        this.roomStatisticsData = data;
                console.log(this.roomStatisticsData.length)
        
        for(let i =0 ;i<this.roomStatisticsData.length; i++)
            {

                this.roomNameData.push(this.roomStatisticsData[i].info.name);
                this.reservationsNumber.push(this.roomStatisticsData[i].nr_rezervari);    
            }

       console.log(this.roomNameData);
       console.log(this.reservationsNumber);
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: this.roomNameData,
                datasets: [{
                    label: 'number of rooms',
                    data: this.reservationsNumber ,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });
 

    })
    
     this.http.get('http://hainedefirmasj.com/placesforme//retrieve_statistics_hotelsData.php').map(result => result.json()).subscribe(data => {
        this.hotelStatisticsData = data;
                console.log(this.roomStatisticsData.length)
        
        for(let i =0 ;i<this.hotelStatisticsData.length; i++)
            {

                this.hotelNameData.push(this.hotelStatisticsData[i].info.name);
                this.reservationsNumberHotels.push(this.hotelStatisticsData[i].nr_rezervari);    
            }

       console.log(this.roomNameData);
       console.log(this.reservationsNumber);
       
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: this.hotelNameData,
                datasets: [{
                    label: 'number of reservations',
                    data: this.reservationsNumberHotels,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }
 
        });

        })
    console.log(1);

  }

launch() {
     const browser = this.iab.create('https://www.google.ro/?gws_rd=cr,ssl&ei=EQUcWcv3LOTI6ASxp71A',"location=no");
     browser.show();
}

// testRoomTypes()
// {
//  this.roomtypesservice.retrieve_room_types().then((data)=>{
//       this.roomTypeData = data;
//        console.log(this.roomTypeData);  
    
//  });
 
// }

// goToReservationsPage(){
//   this.navCtrl.push('Reservations');
// }
//   ionViewDidLoad() {
//     console.log('ionViewDidLoad Statistics');
//    // this.testRoomTypes();
//   }

//   showRooms(type) {
//         console.log('1');
//     let _daysConfig = [
//       {
//         date:new Date(2017,0,1),
//         subTitle:'New Year\'s',
//         marked:true
//       },
//       {
//         date:new Date(2017,1,14),
//         subTitle:'Valentine\'s',
//         disable:true
//       },
//       {
//         date:new Date(2017,3,1),
//         subTitle:'April Fools',
//         marked:true
//       },
//       {
//         date:new Date(2017,3,7),
//         subTitle:'World Health',
//         marked:true
//       },
//       {
//         date:new Date(2017,4,31),
//         subTitle:'No-Smoking',
//         marked:true
//       },
//       {
//         date:new Date(2017,5,1),
//         subTitle:'Children\'s',
//         marked:true
//       }
//     ];

//     //_daysConfig.push(...this.days);

 
//     this.showDetailsDouble = true;
//     this.showDetailsSingle = false;
//     console.log('2');
//       this.calendarCtrl.openCalendar({
//         from: new Date(2017,0,1),
//         to  : new Date(2017,11.1),
//         daysConfig:_daysConfig
//     })
//     .then( res => { alert(res) } );
//   }
}
