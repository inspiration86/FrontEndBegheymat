import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from '../../adminservice.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-administrator-add-dialog',
  templateUrl: './administrator-add-dialog.component.html',
  styleUrls: ['./administrator-add-dialog.component.css']
})
export class AdministratorAddDialogComponent implements OnInit {

  passwordRegix = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{9,}$/;
  public form: FormGroup;
  errorMessages = {
    adminName: [
      {type: 'required', message: 'نام را وارد کنید.'}
    ],
    username: [
      {type: 'required', message: 'نام کاربری را وارد کنید.'}
    ],
    image: [
      {type: 'required', message: 'تصویر را وارد کنید.'}
    ],
    type: [
      {type: 'required', message: 'نوع کاربر ادمین را انتخاب کنید.'}
    ],
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
  types: any[] = [];
  isLogged = false;

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              public ref: DynamicDialogRef,
              public messageService: MessageService,
              public localStorage: LocalStorageService,
              public router: Router,
              public config: DynamicDialogConfig) {
    this.types = [
      {name: 'Master', code: 'Master'},
      {name: 'Admin', code: 'Admin'},
      {name: 'Support', code: 'Support'}
    ];
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();
    if (!this.isLogged) {
      this.router.navigate(['/admin']);
    }
    if (this.localStorage.userJson['type'] !== 'Master') {
      this.router.navigate(['/admin/index']);
    }
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      adminName: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      username: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      image: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      type: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
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

  password(formGroup: FormGroup): any {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : {passwordNotMatch: true};
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
    this.service.addAdmin(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
