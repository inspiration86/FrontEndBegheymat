import {Component, OnInit, ViewChild} from '@angular/core';
import {SellerService} from '../seller.service';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserModel} from '../../dashboard-user/User.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../dashboard-user/User.service';
import {SellerModel} from '../SellerModel';

@Component({
  selector: 'app-setting-seller',
  templateUrl: './setting-seller.component.html',
  styleUrls: ['./setting-seller.component.css'],
  providers: [
    MessageService
  ]
})
export class SettingSellerComponent implements OnInit {

  @ViewChild('ngOtpInput', {static: true}) ngOtpInputRef: any;
  display: boolean = false;
  public getCodeSmS: string;
  otdCode: '';
  public validationBtnPay: boolean = true;
  public invalidSMS: boolean = false;
  public timeLeft: number = 70;
  public interval;
  resendSMS: boolean = false;
  displayBasic: boolean = false;
  seller: SellerModel = null;
  mobileRegix = /^0?9[123]\d{8}$/;
  passwordRegix = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{9,}$/;
  public passwordForm: FormGroup;
  passwordErrorMessages = {
    password: [
      {type: 'required', message: 'کلمه عبور را وارد کنید.'},
      {type: 'minlength', message: 'کلمه عبور نمی تواند کمتر از 8 کاراکتر باشد.'},
      {type: 'pattern', message: 'کلمه عبور باید شامل حروف کوچک و بزرگ لاتین و اعداد و اشکال باشد..'}
    ],
    confirmPassword: [
      {type: 'required', message: 'تکرار کلمه عبور را وارد کنید.'},
      {type: 'minlength', message: 'تکرار کلمه عبور نمی تواند کمتر از 8 کاراکتر باشد.'}
    ]
  };
  public mobileForm: FormGroup;
  mobileErrorMessages = {
    mobile: [
      {type: 'required', message: 'شماره موبایل را وارد کنید.'},
      {type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.'},
      {type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.'},
      {type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.'}
    ],
  };

  constructor(private localStorage: LocalStorageService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private sellerService: SellerService) {
  }

  ngOnInit(): void {

    if (this.localStorage.getCurrentUser() === true) {
      this.seller = this.localStorage.userJson;

      this.passwordForm = this.formBuilder.group({
        password: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(this.passwordRegix)
          ])
        ),
        confirmPassword: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(8)
          ])
        )
      }, {
        validators: this.password.bind(this)
      });

      this.mobileForm = this.formBuilder.group({
        mobile: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            Validators.pattern(this.mobileRegix)
          ])
        ),
      });
    }
  }

  changePasswordUser() {
    this.sellerService.changePassword(this.seller._id, this.passwordForm.value).subscribe((response) => {
      if (response['success'] === true) {
        this.localStorage.removeCurrentUser();
        this.router.navigateByUrl('/sellerBe/login');
      }
    });
  }

  password(formGroup: FormGroup): any {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : {passwordNotMatch: true};
  }


  startTimer() {
    this.timeLeft = 70;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.resendSMS = true;
        this.timeLeft = 0;
      }

    }, 1000);
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

  sendSMS() {
    this.spinner.show();
    this.sellerService.findMobile(this.mobileForm.value).subscribe((result) => {
      if (result['success'] === true) {
        this.spinner.hide();
        this.messageService.add({severity: 'error', summary: 'ناموفق ', detail: 'فروشنده ای با این شماره قبلا ثبت نام کرده است', sticky: true});

      } else {

        this.display = true;
        this.sellerService.getTokenSms().subscribe((res) => {
          if (res['IsSuccessful'] === true) {
            this.getCodeSmS = this.randomNumber();
            let token = res['TokenKey'];
            let data = {
              ParameterArray: [
                {Parameter: 'VerificationCode', ParameterValue: this.getCodeSmS}
              ],
              Mobile: this.mobileForm.get('mobile').value,
              TemplateId: '41804'

            };

            this.sellerService.sendSms(data, token).subscribe((res1) => {
              if (res['IsSuccessful'] === true) {
                this.resendSMS = false;
                this.spinner.hide();
                this.startTimer();
                // this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: res1['Message']});
              }
            });
          }
        });
      }
    });

  }

  onOtpChange(otp) {
    this.otdCode = otp;
    if (this.otdCode.length === 6) {
      if (this.otdCode !== this.getCodeSmS) {
        this.invalidSMS = true;
        this.validationBtnPay = true;
      } else {
        this.invalidSMS = false;
        this.validationBtnPay = false;
      }
    }
  }

  showDialog() {
    this.display = true;
  }

  changeMobile() {
    this.sellerService.changeMobile(this.seller._id, this.mobileForm.value).subscribe((response) => {
      console.log(response);
      if (response['success'] === true) {
        this.localStorage.removeCurrentUser();
        this.router.navigateByUrl('/sellerBe/login');
      }
    });

  }


}
