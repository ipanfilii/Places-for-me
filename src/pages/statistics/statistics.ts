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
  public roomTypeData: any = [];
  public date: Date = new Date(Date.now());
  public showDetailsSingle: boolean = false;
  public showDetailsDouble: boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,private iab: InAppBrowser, private roomtypesservice: RoomTypesService,  public calendarCtrl: CalendarController){


  }
ionViewDidLoad() {
 
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
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
 
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Black"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3,4],
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
 
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }
 
        });
 
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
