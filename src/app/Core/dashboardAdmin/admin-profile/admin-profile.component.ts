import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from '../adminservice.service';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
  providers: [MessageService]
})
export class AdminProfileComponent implements OnInit {

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
  public usernameForm: FormGroup;
  usernameErrorMessages = {
    username: [
      {type: 'required', message: 'نام کاربری را وارد کنید.'}
    ]
  };
  public form: FormGroup;
  errorMessages = {
    adminName: [
      {type: 'required', message: 'نام را وارد کنید.'}
    ],
    image: [
      {type: 'required', message: 'تصویر را وارد کنید.'}
    ]
  };
  admin: any;

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              private router: Router,
              private localStorage: LocalStorageService,
              public messageService: MessageService) {
  }

  ngOnInit(): void {
    const res = this.localStorage.getCurrentUser();
    if (res === false) {
      this.router.navigateByUrl('/sellerBe/login');
    }
    this.admin = this.localStorage.userJson;
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      adminName: new FormControl(
        this.admin.adminName,
        [
          Validators.required
        ]
      ),
      username: new FormControl(
        this.admin.username,
        [
          Validators.required
        ]
      ),
      image: new FormControl(
        this.admin.image,
        [
          Validators.required
        ]
      )
    });

    this.usernameForm = this.formBuilder.group({
      username: new FormControl(
        this.admin.username,
        [
          Validators.required
        ]
      )
    });

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

  }

  imageUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.form.controls.image.setValue(response.imagePath);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر ',
          detail: 'تصویر با موفقیت آپلود شد.'
        });
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

  submitForm(): void {
    this.service.editAdmin(this.admin.id, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.localStorage.removeCurrentUser();
        this.router.navigateByUrl('/admin');
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  password(formGroup: FormGroup): any {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : {passwordNotMatch: true};
  }


  changePassword(): void {
    this.service.editAdmin(this.admin.id, this.passwordForm.value).subscribe((response) => {
      if (response.success === true) {
        this.localStorage.removeCurrentUser();
        this.router.navigateByUrl('/admin');
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  changeUsername(): void {
    this.service.editAdmin(this.admin.id, this.usernameForm.value).subscribe((response) => {
      if (response.success === true) {
        this.localStorage.removeCurrentUser();
        this.router.navigateByUrl('/admin');
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
