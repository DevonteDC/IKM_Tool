import { Component,trigger,state,style,transition,animate,keyframes } from '@angular/core';
import { NavController,ModalController,AlertController } from 'ionic-angular';
import {QuestionEditModal} from '../question-edit-modal/question-edit-modal';
import {AnswerEditModal} from '../answer-edit-modal/answer-edit-modal';
import {Review} from '../review/review';
import {UserData} from '../../providers/user-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations:[

    trigger('flip',[
      state('flipped',style({
        transform:'rotateY(180deg)',
        backgroundColor:'#f50e80'
      })),
      transition('* => flipped',animate('400ms ease'))
    ]),

    trigger('flyInOut',[
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(150%, 0, 0)'
      })),
      transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('200ms ease-out'))
    ]),

    trigger('fade',[
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('visible <=> invisible', animate('200ms linear'))
    ]),

    trigger('bounce', [
      state('bouncing', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing', [
        animate('300ms ease-in', keyframes([
          style({transform: 'translate3d(0,0,0)', offset: 0}),
          style({transform: 'translate3d(0,50%,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    trigger('size',[
      state('shrink', style({
        transform:'rotateY(180deg)',

      })),
      state('grow', style({
        transform:'rotateY(1deg)',
      })),

      transition('shrink => grow', animate('200ms ease-in')),
      transition('grow => shrink', animate('200ms ease-out'))
    ]),


  ]
})
export class HomePage {
  question;
  answers;
  topic;
  category;
  clearTemplate;
  questionPackage;
  constructor(public navCtrl: NavController,public modalCtrl:ModalController,public userData:UserData,public alertCtrl:AlertController) {
    this.answers = ['','','',''];
    this.question = "";
    this.questionPackage = {};

    this.clearTemplate = "shrink";
    let me = this;
    window.setTimeout(function(){
      me.clearTemplate = 'grow';
      // code to run after 5 seconds...
    }, 100);

  }

  openQuestionEditor(){
    let modal = this.modalCtrl.create(QuestionEditModal,{question:this.question,category:this.category,topic:this.topic});
    modal.onDidDismiss(data=>{
      this.question = data.question;
      this.topic = data.topic;
      this.category = data.category;
    });
    modal.present();
  }

  openAnswerEditor(){
    let modal = this.modalCtrl.create(AnswerEditModal,{answers:this.answers});
    modal.onDidDismiss(data=>{
      this.answers = data.answers;
    });
    modal.present();
  }

  newQuestion(){
    if(this.question != ""){


      this.question = "";
      this.answers = ['','','',''];
      this.topic = '',
      this.category = '';
      this.questionPackage = {};
    }else{
      let alert = this.alertCtrl.create({
        message: 'No question was entered!',
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    }

  }

  modifyStringForDatabase(string)
  {
    let modifiedString = [];
    let words = string.split(" ");
    words.forEach(function(w){
      modifiedString.push(w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    });
    return modifiedString.join(" ").trim();
  }

  review(){
    if(this.question != ''){
      if(this.answers[0] != ''){
        if(this.answers[1] != ''){
          if(this.answers[2] != ''){
            if(this.answers[3] != ''){
              this.questionPackage = {
                question:this.question,
                topic: this.topic,
                category: this.category,
                correctAnswer:this.answers[0],
                incorrectAnswer1:this.answers[1],
                incorrectAnswer2:this.answers[2],
                incorrectAnswer3:this.answers[3],
                creator:this.userData.userName
              }
              let modal = this.modalCtrl.create(Review,{questionPackage:this.questionPackage});
              modal.onDidDismiss(data=>{
                if(data.index == null){
                  this.newQuestion();
                }else{

                  let q = this.questionPackage;
                  this.question = q.question;
                  this.answers = [q.correctAnswer,q.incorrectAnswer1,q.incorrectAnswer2,q.incorrectAnswer3];
                  this.topic = q.topic;
                  this.category = q.category;
                }

              });
              modal.present();
            }else{
              let alert = this.alertCtrl.create({
                message: 'Incorrect Answer 3 was not entered',
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              alert.present();
            }
          }else{
            let alert = this.alertCtrl.create({
              message: 'Incorrect Answer 2 was not entered',
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          }
        }else{
          let alert = this.alertCtrl.create({
            message: 'Incorrect Answer 1 was not entered',
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        }
      }else{
        let alert = this.alertCtrl.create({
          message: 'Correct Answer was not entered',
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      }

    }else{
      let alert = this.alertCtrl.create({
        message: 'No question was entered',
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    }

  }


}
