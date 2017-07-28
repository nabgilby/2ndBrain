import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, username: string, password: string, email: string } = {
    name: "",
    username: "",
    email: "",
    password: "" 
  };

  // Our translated text strings
  private signupErrorString: string;
  confirmEmail: string = "";
  confirmPassword: string = "";


  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    if (this.account.password == this.confirmPassword || this.account.email == this.confirmEmail) {

      // Attempt to signup in through our User service
      this.user.signup(this.account).subscribe((resp) => {
        this.navCtrl.push(MainPage);

        // Unable to sign up
        let toastS = this.toastCtrl.create({
          message: "Account Created, Welcome " + this.account.username + ", to 2nd Brain.",
          duration: 6000,
           position: 'top'
        });
        toastS.present();
      }, 
      (err) => {

        this.navCtrl.push(MainPage); // TODO: Remove this when you add your signup endpoint

        // Unable to sign up
        let toastE = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 6000,
          position: 'top'
        });
        toastE.present();
        
      }); // subscribe
    }
  } // doSignup
} //class 
