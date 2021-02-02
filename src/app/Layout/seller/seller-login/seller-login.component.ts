import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LayoutService} from '../../layout.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {UserService} from '../../../Auth/user.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css'],
  providers: [MessageService]
})
export class SellerLoginComponent implements OnInit {

  form: FormGroup;
  mobileRegix = /^0?9[123]\d{8}$/;
  errorMessages = {
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید.' },
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' }
    ],
    password: [
      { type: 'required', message: 'کلمه عبور را وارد کنید.' }
    ]
  };
  displayForgetPassword: boolean = false;
  forgetPasswordMobile: string;
  public getCodeSmS: string;
  constructor(private formBuilder: FormBuilder,
              private layoutService: LayoutService,
              private messageService: MessageService,
              private router: Router,
              private localStorage: LocalStorageService,
              private authService: UserService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        mobile: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            Validators.pattern(this.mobileRegix)
          ])
        ),
        password: new FormControl(
          null,
          Validators.compose([
            Validators.required
          ])
        )
      }
    );
  }

  login(): void {
    this.spinner.show();
    this.layoutService.loginSeller(this.form.value).subscribe((response) => {
      if (response['success'] === true) {
        this.spinner.hide();
        this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
        this.router.navigateByUrl('/seller');
      }
      else {
        this.messageService.add({severity: 'error', summary: ' ورود ', detail: response['data'], sticky: true});
      }
    });
  }
  forgetPassword() {
    let data = {mobile: this.forgetPasswordMobile};
    this.layoutService.onfindSeller(data).subscribe((result) => {
      if (result['success'] !== true) {
        this.displayForgetPassword=false;
        this.messageService.add({severity: 'error', summary: 'ناموفق ', detail: result['data']});
      } else {
        this.authService.getTokenSms().subscribe((res) => {
          if (res['IsSuccessful'] === true) {
            this.layoutService.resetPassword(data).subscribe((res1)=>{

             if(res1['success']===true){
               let token = res['TokenKey'];
               let dataSMS = {
                 ParameterArray: [
                   {Parameter: 'VerificationCode', ParameterValue: res1['newpass']}
                 ],
                 Mobile: this.forgetPasswordMobile,
                 TemplateId: '40830'

               };
               this.spinner.show();
               this.authService.sendSms(dataSMS, token).subscribe((res2) => {
                 if (res2['IsSuccessful'] === true) {
                   this.spinner.hide();
                   this.displayForgetPassword = false;
                   this.messageService.add({severity: 'success', summary: 'موفق', detail: 'رمز عبور جدید به شماره همراه پیامک شد'});

                 }
               });
             }

            })

          }
        });
      }
    });

  }
  randomNumber() {
    var text = '';
    var possible = '123456789';
    for (var i = 0; i < 6; i++) {
      var sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? '0' : possible.charAt(sup);
    }
    return text;
  }
  showDialogForgetPassword() {
    this.displayForgetPassword = true;
  }
}
