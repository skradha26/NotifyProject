import {Component, ViewChild} from '@angular/core';
import { NavController,AlertController,Platform } from 'ionic-angular';

import { LocalNotifications } from '@ionic-native/local-notifications';
import {min} from "rxjs/operator/min";
import {max} from "rxjs/operator/max";

import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {


  @ViewChild('barCanvas') barCanvas;

  barChart: any;


  public before_work_notification_time:any = new Date(new Date().setHours(7,30,0)); // 30 minutes before work time
  public work_start_time:any = new Date(new Date().setHours(8,0,0)); // work start time
  public work_end_time:any = new Date(new Date().setHours(16,30,0)); // work end time
  public half_time:any = new Date(new Date(new Date().setHours(13,0,0)))
  public diff = (this.half_time.getTime() - (new Date(this.work_start_time.getTime()+ 1800000)).getTime())
  public random_date:any = new Date((new Date(this.work_start_time.getTime()+ 1800000)).getTime() + (this.diff*Math.random()));


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public plt: Platform, public localNotifications: LocalNotifications,) {
     this.plt.ready().then((rdy) => {

       let date = new Date();
      // this.before_work_notification_time = new Date(date.setHours(10,28,0))
     //  this.work_start_time = new Date(date.setHours(8,0,0)) // work start time
     //  let work_end_time = new Date(date.setHours(16,30,0)) // work end time

       var notification_times:Date[];
       notification_times = [
         new Date(this.before_work_notification_time.getTime()), // before work start time 7:00 am
         new Date(this.work_start_time.getTime()+ 1800000), // notification 30 minutes after work start time
       //  new Date((work_start_time.getTime()) + 2*3600000),
       //  new Date(before_work_notification_time.getTime() + 3*3600000),
       //  new Date(new Date(date.setHours(18,30,0))),
       ];


       // daily before work notification
       this.localNotifications.schedule({
         id:1,
         title: 'Good morning',
         text: 'My morning notification' + this.before_work_notification_time.getHours(),
         at: this.before_work_notification_time,
         every: 'day',
         data: { mydata: 'My daily before work notification'}
       });

       // daily 30 minutes after work start notification
       this.localNotifications.schedule({
         id:2,
         title: 'Good morning',
         text: '30 minutes after work start notification' + (this.work_start_time.getTime() + 1800000),
         at: (this.work_start_time.getTime() + 1800000) ,
         every: 'day',
         data: { mydata: 'My daily after work start notification'}
       });


       // --- Code to generate 2 random notifications before half time --- //

       let half_time = new Date(new Date(date.setHours(13,0,0)))
      // let min_time = new Date(date.setHours(16,18,0)) // work start time
       var diff = (half_time.getTime() - notification_times[1].getTime())
       this.random_date = new Date((notification_times[1]).getTime() + (diff*Math.random()))
       var random_date2 = new Date(notification_times[1].getTime() + (diff*Math.random()))
       console.log("random date 1 hours" + this.random_date.getHours() + ":" + this.random_date.getMinutes()+ ":" + this.random_date.getSeconds())
       console.log("random date 2 hours " + random_date2.getHours() + ":"+  random_date2.getMinutes()+ ":" + random_date2.getSeconds())
       if(this.random_date.getTime() > random_date2.getTime())
       {
         if((this.random_date.getTime() - random_date2.getTime()) < 3600000)
         {
           random_date2.setTime(random_date2.getTime() + 3600000)
           console.log("first if")
         }
       }
       if(random_date2.getTime() > this.random_date.getTime())
       {
         if((random_date2.getTime() - this.random_date.getTime()) < 3600000)
         {
           this.random_date.setTime(this.random_date.getTime() + 3600000)
           console.log("second if")
         }

       }
       console.log("random date 1" + this.random_date.getHours() + ":"+ this.random_date.getMinutes() + ":" + this.random_date.getSeconds())
       console.log("random date 2" + random_date2.getHours() + ":"+  random_date2.getMinutes()+ ":" + random_date2.getSeconds())
       // end of code to generate 2 random notifications before half time -- //


       // random notification 1 in the first half of the day
       this.localNotifications.schedule({
         id:3,
         title: 'Good morning',
         text: 'Random notification one'+ 'at' + this.random_date.getHours(),
         at: this.random_date,
         every: 'day',
         data: { mydata: 'My daily after work start before half time notification'}
       });


       // random notification 2 in the first half of the day
       this.localNotifications.schedule({
         id:4,
         title: 'Morning notification',
         text: 'Random notification two'+ 'at' + random_date2.getHours(),
         at: random_date2,
         every: 'day' ,
         data:  { mydata: 'My notification message after work start before half time notification2'}
       });


       // --- Code to generate 2 random notifications second half of the day--- //

       var diff2 = this.work_end_time.getTime() - half_time.getTime()
       var random_date3 = new Date(half_time.getTime() + (diff2*Math.random()))
       var random_date4 = new Date(half_time.getTime() + (diff2*Math.random()))
       console.log("random date 3 hours" + random_date3.getHours() + ":" + random_date3.getMinutes()+ ":" + random_date3.getSeconds())
       console.log("random date 4 hours " + random_date4.getHours() + ":"+  random_date4.getMinutes()+ ":" + random_date4.getSeconds())

       if(random_date3.getTime() > random_date4.getTime())
       {
         if((random_date3.getTime() - random_date4.getTime()) < 3600000)
         {
           random_date4.setTime(random_date4.getTime() + 3600000)
           console.log("first if second half")
         }
       }
       else {
         if((random_date4.getTime() - random_date3.getTime()) < 3600000)
         {
           random_date3.setTime(random_date3.getTime() + 3600000)
           console.log("second if second half")
         }

       }
       console.log("random date 3 hours" + random_date3.getHours() + ":" + random_date3.getMinutes()+ ":" + random_date3.getSeconds())
       console.log("random date 4 hours " + random_date4.getHours() + ":"+  random_date4.getMinutes()+ ":" + random_date4.getSeconds())

       // ---- End of code to generate 2 random notifications during second half of the day --- //

       // random notification 1 in the second half of the day
       this.localNotifications.schedule({
         id:5,
         title: 'Good afternoon',
         text: 'Random notification three' + 'at' + random_date3.getHours(),
         at: random_date3,
         every: 'day',
         data: { mydata: 'My daily after work start before half time notification'}
       });


       // random notification 2 in the second half of the day
       this.localNotifications.schedule({
         id:6,
         title: 'Morning notification',
         text: 'Random notification four'+ 'at' + random_date4.getHours(),
         at: random_date4,
         every: 'day' ,
         data:  { mydata: 'My notification message after work start before half time notification2'}
       });

       var half_hour_before_work_end = new Date(this.work_end_time.getTime() - 1800000)
       console.log("half hour before work end time" + half_hour_before_work_end.getHours() + ":" + half_hour_before_work_end.getMinutes() + half_hour_before_work_end.getSeconds())
       // random notification half hour before work end time
       this.localNotifications.schedule({
         id:7,
         title: 'Morning notification',
         text: 'Random notification four',
         at: (this.work_end_time.getTime() - 1800000),
         every: 'day' ,
         data:  { mydata: 'My notification message after work start before half time notification2'}
       });


       // notification one hour after work end time
       this.localNotifications.schedule({

         id:8,
         title: 'Good evening',
         text: 'My evening notification 4',
        // at: new Date((new Date().setHours(14,5,0))),
         at: (this.work_end_time.getTime() + 3600000),
         every: 'day',
         data: { mydata: 'My daily midafternoon work notification'}
       });

     });



}

     ionViewDidLoad(){

        console.log("in ionview load random date 1" + this.random_date.getHours() + ":" + this.random_date.getMinutes())

        this.barChart = new Chart(this.barCanvas.nativeElement,
          {
            type: 'bar',
            data: {
              labels: ["Notification one","Notification two","Notification 3","Notification four", "Notification five","Notification six"],
              datasets: [{
                label: 'Notifications',
                data: [this.before_work_notification_time.getHours(),this.work_start_time.getHours(),this.random_date.getHours(),this.work_end_time.getHours()],
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
                    //beginAtZero:true,
                    type:'time'
                  }
                }]
              }
            }


          });

     }

     displayfunc()
     {
       console.log("first one was scheduled" + this.before_work_notification_time.getMinutes())
     }
    //
    // generateNotificationTimes()
    // {
    //   let date = new Date();
    //   let max_time = new Date(new Date(date.setHours(18,30,0)))
    //   let min_time = new Date(date.setHours(16,18,0)) // work start time
    //   var diff = (max_time.getTime() - min_time.getTime())
    //   var new_diff = diff* Math.random()
    //   var random_date = new Date(min_time.getTime() + (diff*Math.random()))
    // //  var new_diff1 = diff*Math.random()
    //   var random_date2 = new Date(min_time.getTime() + (diff*Math.random()))
    //   console.log("random date 1" + random_date)
    //   console.log("random date 2" + random_date2)
    //   return new Date(random_date)
    // }



  }
