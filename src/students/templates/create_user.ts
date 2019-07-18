import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NavController, NavParams, AlertController, MenuController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import Swal from 'sweetalert2'

import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';

import { CommonServicesProvider } from '../../providers/common-services/common-services';

@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {

  public prism: any;
  public apiLink: any;
  public loader: any;
  public newAccountData: any;
  public djangoLoginData: any;
  public storedIDNumber: any;
  public storedTelephone: any;
  public storedFirstName: any;
  public storedLastName: any;
  public showIDNumberIDLabel: any;
  public showTelephoneLabel: any;
  public showFirstNameLabel: any;
  public showLasstNameLabel: any;
  public showEmailLabel: any;
  public showPasswordLabel: any;
  public showPasswordConfirmationLabel: any;
  public showLoginPasswordLabel: any;
  public showLoginUsernameLabel: any;
  public userExistsAndShouldLogin: any;

  @ViewChild('idNumber') userIDNumber;
  @ViewChild('telephone') userTelephone;
  @ViewChild('firstName') userFirstName;
  @ViewChild('lastName') userLarstName;
  @ViewChild('email') userEmail;
  @ViewChild('password') userPassword;
  @ViewChild('passwordConfirmation') confirmedPassword;
  @ViewChild('username') loginUsername;
  @ViewChild('loginPassword') userLoginPassword;  

  constructor(public http: HttpClient, public angFireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private alertCtrl: AlertController, public loadingControl: LoadingController, public commonService: CommonServicesProvider) {

    this.apiLink = "https://loan-app-kenya.herokuapp.com";

    this.menu = menu;
    this.menu.enable(false, 'sideMenuID');

    var userStoredIDNumber = window.localStorage.getItem('loanApp12_userStoredIDNumber');
    if((userStoredIDNumber==null)||(userStoredIDNumber=='null')||(userStoredIDNumber==undefined)||(userStoredIDNumber=='undefined')||(userStoredIDNumber==''))
    {
      this.storedIDNumber = '';
      this.showIDNumberIDLabel = true;
    }
    else
    {
      this.storedIDNumber = userStoredIDNumber;
      this.showIDNumberIDLabel = false;
    }

    var userStoredTelephone = window.localStorage.getItem('loanApp12_userStoredTelephone');
    if((userStoredTelephone==null)||(userStoredTelephone=='null')||(userStoredTelephone==undefined)||(userStoredTelephone=='undefined')||(userStoredTelephone==''))
    {
      this.storedTelephone = '';
      this.showTelephoneLabel = true;
    }
    else
    {
      this.storedTelephone = userStoredTelephone;
      this.showTelephoneLabel = false;
    }

    var userStoredFirstName = window.localStorage.getItem('loanApp12_userStoredFirstName');
    if((userStoredFirstName==null)||(userStoredFirstName=='null')||(userStoredFirstName==undefined)||(userStoredFirstName=='undefined')||(userStoredFirstName==''))
    {
      this.storedFirstName = '';
      this.showFirstNameLabel = true;
    }
    else
    {
      this.storedFirstName = userStoredFirstName;
      this.showFirstNameLabel = false; 
    }

    var userStoredLastName = window.localStorage.getItem('loanApp12_userStoredLastName');
    if((userStoredLastName==null)||(userStoredLastName=='null')||(userStoredLastName==undefined)||(userStoredLastName=='undefined')||(userStoredLastName==''))
    {
      this.storedLastName = '';
      this.showLasstNameLabel = true;
    }
    else
    {
      this.storedLastName = userStoredLastName;
      this.showLasstNameLabel = false;
    }

    this.showEmailLabel = true;
    this.showPasswordLabel = true;
    this.showPasswordConfirmationLabel = true;
    this.showLoginPasswordLabel = true;
    this.showLoginUsernameLabel = true;

  }

  presentAlert(alertTitle: String, alertMsg: String) {
    let thePopup = this.alertCtrl.create({
      title: ''+alertTitle+'',
      subTitle: ''+alertMsg+'',
      buttons: ['OK']
    });
    thePopup.present();
  }

  showLoading(loadingMessage) {
    this.loader = this.loadingControl.create({
      content: ""+loadingMessage
    });

    this.loader.present();
  }

  showSuccessMessage(successMessage: String) {

    Swal(
      'Success!',
      ''+successMessage+'',
      'success'
      )

  }

  showInformationMessage(information: String) {

    Swal(
      'Info!',
      ''+information+'',
      'info'
      )

  }

  showErrorMessage(errorMessage: String) {

    Swal(
      'Error!',
      ''+errorMessage+'',
      'error'
      )
    
  }

  ionViewDidLoad() {
  	this.prism = document.getElementById("rec-prism");
  }

  showSignup(){
  	// this.prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  }

  showLogin(){
  	// this.prism.style.transform = "translateZ(-100px)";
  	this.navCtrl.push(LoginPage);
  }

  wipeIDNumberLabel() {
    this.showIDNumberIDLabel = false;

    var sentTel = this.userTelephone.value;
    if (sentTel == '') {
      this.showTelephoneLabel = true;
    }

    var sentFirstName = this.userFirstName.value;
    if (sentFirstName == '') {
      this.showFirstNameLabel = true;
    }

    var sentLastName = this.userLarstName.value;
    if (sentLastName == '') {
      this.showLasstNameLabel = true;
    }

  }

  alterIDNumberLabel() {
    var sentIdNumber = this.userIDNumber.value;
    if (sentIdNumber == '') {
      this.showIDNumberIDLabel = true;
    }
  }

  wipeTelephoneLabel() {
    this.showTelephoneLabel = false;

    var sentIdNumber = this.userIDNumber.value;
    if (sentIdNumber == '') {
      this.showIDNumberIDLabel = true;
    }

    var sentFirstName = this.userFirstName.value;
    if (sentFirstName == '') {
      this.showFirstNameLabel = true;
    }

    var sentLastName = this.userLarstName.value;
    if (sentLastName == '') {
      this.showLasstNameLabel = true;
    }
  }

  alterTelephoneLabel() {
    var sentTel = this.userTelephone.value;
    if (sentTel == '') {
      this.showTelephoneLabel = true;
    }
  }

  wipeFirstNameLabel() {
    this.showFirstNameLabel = false;

    var sentTel = this.userTelephone.value;
    if (sentTel == '') {
      this.showTelephoneLabel = true;
    }

    var sentIdNumber = this.userIDNumber.value;
    if (sentIdNumber == '') {
      this.showIDNumberIDLabel = true;
    }

    var sentLastName = this.userLarstName.value;
    if (sentLastName == '') {
      this.showLasstNameLabel = true;
    }
  }

  alterFirstNameLabel() {
    var sentFirstName = this.userFirstName.value;
    if (sentFirstName == '') {
      this.showFirstNameLabel = true;
    }
  }

  wipeLastNameLabel() {
    this.showLasstNameLabel = false;

    var sentTel = this.userTelephone.value;
    if (sentTel == '') {
      this.showTelephoneLabel = true;
    }

    var sentIdNumber = this.userIDNumber.value;
    if (sentIdNumber == '') {
      this.showIDNumberIDLabel = true;
    }

    var sentFirstName = this.userFirstName.value;
    if (sentFirstName == '') {
      this.showFirstNameLabel = true;
    }

  }

  alterLastNameLabel() {
    var sentLastName = this.userLarstName.value;
    if (sentLastName == '') {
      this.showLasstNameLabel = true;
    }
  }

  wipeEmailLabel() {
    this.showEmailLabel = false;

    var sentPassword = this.userPassword.value;
    if (sentPassword == '') {
      this.showPasswordLabel = true;
    }
    
    var sentPasswordConfirmation = this.confirmedPassword.value;
    if (sentPasswordConfirmation == '') {
      this.showPasswordConfirmationLabel = true;
    }

  }

  alterEmailLabel() {
    var sentEmail = this.userEmail.value;
    if (sentEmail == '') {
      this.showEmailLabel = true;
    }
  }

  wipePasswordLabel() {
    this.showPasswordLabel = false;

    var sentEmail = this.userEmail.value;
    if (sentEmail == '') {
      this.showEmailLabel = true;
    }

    var sentPasswordConfirmation = this.confirmedPassword.value;
    if (sentPasswordConfirmation == '') {
      this.showPasswordConfirmationLabel = true;
    }

  }

  alterPasswordLabel() {
    var sentPassword = this.userPassword.value; 
    if (sentPassword == '') {
      this.showPasswordLabel = true;
    }
  }

  wipePasswordConfirmationLabel() {
    this.showPasswordConfirmationLabel = false;

    var sentEmail = this.userEmail.value;
    if (sentEmail == '') {
      this.showEmailLabel = true;
    }

    var sentPassword = this.userPassword.value;
    if (sentPassword == '') {
      this.showPasswordLabel = true;
    }

  }

  alterPasswordConfirmationLabel() {
    var sentPasswordConfirmation = this.confirmedPassword.value;
    if (sentPasswordConfirmation == '') {
      this.showPasswordConfirmationLabel = true;
    }
  }

  wipeLoginUsernameLabel() {
    this.showLoginUsernameLabel = false;

    var receivedPassword = this.userLoginPassword.value;
    if (receivedPassword == '') {
      this.showLoginPasswordLabel = true;
    }

  }

  alterLoginUsernameLabel() {
    var receivedEmail = this.loginUsername.value; 
    if (receivedEmail == '') {
      this.showLoginUsernameLabel = true;
    }
  }

  wipeLoginPasswordLabel() {
    this.showLoginPasswordLabel = false;

    var receivedEmail = this.loginUsername.value; 
    if (receivedEmail == '') {
      this.showLoginUsernameLabel = true;
    }

  }

  alterLoginPasswordLabel() {
    var receivedPassword = this.userLoginPassword.value;
    if (receivedPassword == '') {
      this.showLoginPasswordLabel = true;
    }
  }

  showNextSignupPage(){

    var idNumber = this.userIDNumber.value;
    var tel = this.userTelephone.value;
    var firstName = this.userFirstName.value;
    var lastName = this.userLarstName.value;

    if ((idNumber == '')||(tel == '')||(firstName == '')||(lastName == '')) {

      this.showErrorMessage("Please supply the whole data to proceed!");
    }
    else
    {
      window.localStorage.setItem('loanApp12_userStoredIDNumber', idNumber);
      window.localStorage.setItem('loanApp12_userStoredTelephone', tel);
      window.localStorage.setItem('loanApp12_userStoredFirstName', firstName);
      window.localStorage.setItem('loanApp12_userStoredLastName', lastName);

      // this.prism.style.transform = "translateZ(-100px) rotateY( -180deg)";

    }

  }

  showForgotPassword(){
  	// this.prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
  }

  showContactUs(){
  	// this.prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  }

  showThankYou(){
  	// this.prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
  }

  testCreateAccount() {

    //var sentTel = this.userTelephone.value;
    //var sentIdNumber = this.userIDNumber.value;
    var sentFirstName = this.userFirstName.value;
    var sentLastName = this.userLarstName.value;
    var sentEmail = this.userEmail.value.toLowerCase(); 
    //var sentPassword = this.userPassword.value; 
    //var sentPasswordConfirmation = this.confirmedPassword.value;

    window.localStorage.setItem('loanApp12_firebase_id', 'firebase');
    window.localStorage.setItem('loanApp12_user_slug', sentFirstName);
    window.localStorage.setItem('loanApp12_verified', 'true');
    window.localStorage.setItem('loanApp12_email_address', sentEmail);
    window.localStorage.setItem('loanApp12_first_name', sentFirstName);
    window.localStorage.setItem('loanApp12_middle_name', '');
    window.localStorage.setItem('loanApp12_last_name', sentLastName);
    window.localStorage.setItem('loanApp12_profile_image_url', '');

    window.localStorage.setItem('loanApp12_userStoredIDNumber', '');
    window.localStorage.setItem('loanApp12_userStoredTelephone', '');
    window.localStorage.setItem('loanApp12_userStoredFirstName', '');
    window.localStorage.setItem('loanApp12_userStoredLastName', '');

    this.showSuccessMessage("Account created!");

    this.showLogin();

  }

  testLogin() {

    //var receivedEmail = this.loginUsername.value.toLowerCase();
    //var receivedPassword = this.userLoginPassword.value;

    window.localStorage.setItem('loanApp12_isLogged', 'true');
    window.localStorage.setItem('loanApp12_active_login_token', 'hjh5454');

    this.showSuccessMessage("Login successful");

    var theHomePage = { title: 'Home', component: HomePage };
    this.navCtrl.setRoot(theHomePage.component);

  }

  async updateuserRecordInFirebase(emailAddress: string, pass: string) {

    try
    {
      const firbaseLoginUserTestresult = await this.angFireAuth.auth.createUserWithEmailAndPassword(emailAddress, pass);

      if ((firbaseLoginUserTestresult.user)) {

        // this.createDjangoUser(firbaseLoginUserTestresult.user.uid);
      }
    }
    catch(err) {
      /*this.presentAlert("Error!", err);*/
    }

  }

  testSignupUser() {

    var userTestSignupEmail = this.userEmail.value.toLowerCase();
    var userTestSignupPassword = this.userPassword.value;

    if((userTestSignupEmail != '')&&(userTestSignupPassword != '')) {

      this.showLoading("Account configuration ...");

      this.http.get(this.apiLink+'/rest_test_login_user/?email='+userTestSignupEmail+'&password='+userTestSignupPassword+'&format=json').subscribe(

        userTestData => {

          if (userTestData != '') {
            if ((userTestData[0].user_firebase_id == 'none')&&(userTestData[0].result == '1')) {

              this.updateuserRecordInFirebase(userTestSignupEmail, userTestSignupPassword);
              this.userExistsAndShouldLogin = 'true';

              this.loader.dismiss();

            }
            else
            {
              this.loader.dismiss();
            }
          }
          else
          {
            this.loader.dismiss();
          }


        })

    }

  }

  async createFirebaseUser() {

    var userShouldSignin = this.userExistsAndShouldLogin;

    if(userShouldSignin == 'true')
    {
      this.showInformationMessage("You are already registered! please login!");
    }
    else
    {
      var sentTel = this.userTelephone.value;
      var sentIdNumber = this.userIDNumber.value;
      var sentFirstName = this.userFirstName.value;
      var sentLastName = this.userLarstName.value;
      var sentEmail = this.userEmail.value.toLowerCase(); 
      var sentPassword = this.userPassword.value; 
      var sentPasswordConfirmation = this.confirmedPassword.value;

      if ((sentTel == '')||(sentIdNumber == '')||(sentFirstName == '')||(sentLastName == '')||(sentEmail == '')||(sentPassword == '')||(sentPasswordConfirmation == '')) {
        this.showErrorMessage("Please supply all the data to proceed!");
      }
      else
      {
        if (sentPassword != sentPasswordConfirmation) {
          this.showErrorMessage("The two passwords don't match. Please check your password and try again!");
        }
        else
        {
          var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(sentEmail.match(mailformat))
          {
            this.showLoading("Account configuration ...");

            try
            {
              const result = await this.angFireAuth.auth.createUserWithEmailAndPassword(sentEmail, sentPassword);

              this.loader.dismiss();

              if ((result.user)) {
                this.createDjangoUser(result.user.uid);
              }
            }
            catch(err) {
              this.loader.dismiss();
              /*this.presentAlert("Error!", err);*/
            }
          }
          else
          {
            this.showErrorMessage("Please enter a valid email address to proceed!");
          }
        }
      }

    }

  }

  createDjangoUser(firebaseID: String) {

    var sentTel = this.userTelephone.value;
    var sentIdNumber = this.userIDNumber.value;
    var sentFirstName = this.userFirstName.value;
    var sentLastName = this.userLarstName.value;
    var sentEmail = this.userEmail.value.toLowerCase(); 
    var sentPassword = this.userPassword.value; 
    var sentPasswordConfirmation = this.confirmedPassword.value;

    if ((sentTel == '')||(sentIdNumber == '')||(sentFirstName == '')||(sentLastName == '')||(sentEmail == '')||(sentPassword == '')||(sentPasswordConfirmation == '')) {
      this.showErrorMessage("Please supply the whole data to proceed!");
    }
    else
    {
      if (sentPassword != sentPasswordConfirmation) {
        this.showErrorMessage("The two passwords don't match. Please check your password and try again!");
      }
      else
      {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
        if(sentEmail.match(mailformat))  
        { 
          this.showLoading("Creating account ...");

          this.commonService.checkInternetConnection().then((connectionInfo) => {

            if((connectionInfo == false)||(connectionInfo == 'false')||(connectionInfo == 'False')) {
              this.loader.dismiss();
              this.showErrorMessage("Please connect your internet to proceed!");
            }
            else
            {
              this.http.get(this.apiLink+'/rest_user_registration/?firebase_id='+firebaseID+'&id_number='+sentIdNumber+'&first_name='+sentFirstName+'&last_name='+sentLastName+'&email='+sentEmail+'&tel='+sentTel+'&password='+sentPassword+'&password_confirmation='+sentPasswordConfirmation+'&format=json').subscribe(

                newAccountData => {

                  this.loader.dismiss();

                  if (newAccountData != '') {

                    if (newAccountData[0].result == '1') {

                      //window.localStorage.setItem('loanApp12_isLogged', 'true');
                      window.localStorage.setItem('loanApp12_firebase_id', newAccountData[0].firebase_id);
                      window.localStorage.setItem('loanApp12_user_slug', newAccountData[0].user_slug);
                      window.localStorage.setItem('loanApp12_verified', newAccountData[0].verified);
                      window.localStorage.setItem('loanApp12_email_address', newAccountData[0].email_address);
                      window.localStorage.setItem('loanApp12_first_name', newAccountData[0].first_name);
                      window.localStorage.setItem('loanApp12_middle_name', newAccountData[0].middle_name);
                      window.localStorage.setItem('loanApp12_last_name', newAccountData[0].last_name);
                      window.localStorage.setItem('loanApp12_profile_image_url', newAccountData[0].profile_image_url);

                      window.localStorage.setItem('loanApp12_userStoredIDNumber', '');
                      window.localStorage.setItem('loanApp12_userStoredTelephone', '');
                      window.localStorage.setItem('loanApp12_userStoredFirstName', '');
                      window.localStorage.setItem('loanApp12_userStoredLastName', '');

                      this.showSuccessMessage(newAccountData[0].success);

                      this.showLogin();

                      /*this.navCtrl.push(HomePage);*/

                      // var homePageLink = { title: 'Home', component: HomePage };

                      // this.navCtrl.setRoot(homePageLink.component);

                    }
                    else
                    {
                      this.showErrorMessage(newAccountData[0].error);
                    }
                  }
                  else
                  {
                    this.showErrorMessage("Server error! Please try again");
                  }

                  },
                  err => {
                    this.loader.dismiss();
                      /*this.presentAlert("Error!", err);*/
                  }
                )
            }

            });

        }
        else
        {
          this.showErrorMessage("You have entered an invalid email address!");
        }       
      }
    }   
  }
  
}
